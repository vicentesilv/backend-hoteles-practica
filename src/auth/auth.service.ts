import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    private transporter: nodemailer.Transporter;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {
        // Configurar el transportador de nodemailer
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.mail,
                pass: process.env.mailPass,
            },
        });
    }

    async verifyUser(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ 
            where: { email },
            select: ['id', 'email', 'nombre', 'contrasena', 'rol', 'isVerified']
        });
    }

    async login(email: string, contrasena: string): Promise<{ access_token: string; user: any }> {
        const user = await this.verifyUser(email);
        
        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');
        if (!user.isVerified) throw new UnauthorizedException('Usuario no verificado. Por favor verifica tu correo electrónico');
        
        const payload = { sub: user.id, email: user.email, rol: user.rol,nombre: user.nombre };
        const { contrasena: _, ...userWithoutPassword } = user;

        return {
            access_token: this.jwtService.sign(payload),
            user: userWithoutPassword,
        };
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.usersRepository.findOne({ 
            where: { email },
            select: ['id', 'email', 'nombre', 'resetPasswordToken', 'resetPasswordExpires']
        });
        
        if (!user) {
            // No revelamos si el usuario existe o no por seguridad
            return;
        }

        // Generar token JWT para recuperación de contraseña
        const payload = { 
            sub: user.id, 
            email: user.email,
            type: 'password-reset'
        };
        const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });

        // Guardar el token y su fecha de expiración en la base de datos
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = expiresAt;
        await this.usersRepository.save(user);

        // Construir la URL de recuperación
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

        // Enviar el correo
        const mailOptions = {
            from: process.env.mail,
            to: user.email,
            subject: 'Recuperación de contraseña',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Recuperación de contraseña</h2>
                    <p>Hola ${user.nombre},</p>
                    <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para continuar:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #4CAF50; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Restablecer contraseña
                        </a>
                    </div>
                    <p>O copia y pega este enlace en tu navegador:</p>
                    <p style="word-break: break-all; color: #666;">${resetUrl}</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        Este enlace expirará en 1 hora. Si no solicitaste este cambio, ignora este correo.
                    </p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new BadRequestException('Error al enviar el correo de recuperación');
        }
    }

    async resetPassword(token: string, nuevaContrasena: string): Promise<void> {
        // Verificar que el token JWT sea válido
        let decoded;
        try {
            decoded = this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Token inválido o expirado');
        }

        // Verificar que sea un token de recuperación de contraseña
        if (decoded.type !== 'password-reset') {
            throw new UnauthorizedException('Token no válido para esta operación');
        }

        // Buscar el usuario y verificar que el token coincida con el de la BD
        const user = await this.usersRepository.findOne({ 
            where: { id: decoded.sub },
            select: ['id', 'email', 'contrasena', 'resetPasswordToken', 'resetPasswordExpires']
        });

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        // Verificar que el token coincida con el guardado en la BD
        if (user.resetPasswordToken !== token) {
            throw new UnauthorizedException('Token no coincide con el registrado');
        }

        // Verificar que el token no haya expirado
        if (!user.resetPasswordExpires || new Date() > user.resetPasswordExpires) {
            throw new UnauthorizedException('El token ha expirado');
        }

        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        // Actualizar la contraseña y limpiar los campos de recuperación
        user.contrasena = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        
        await this.usersRepository.save(user);
    }

  
}

