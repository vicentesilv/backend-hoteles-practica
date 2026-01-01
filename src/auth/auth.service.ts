import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { confignodeemail } from 'src/config/nodeemail';
import { RegisterDto } from './dto/register.dto';
const SALT=10;
@Injectable()
export class AuthService {
    private emailService: confignodeemail;
    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {
        // Inicializar el servicio de correo
        this.emailService = new confignodeemail();
    }

    /**
     * @member vicente silva
     * @description Verifica si un usuario existe por su email 
     * @param email - Email del usuario a verificar
     * @returns El usuario si existe, null si no existe
     */
    async verifyUser(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ 
            where: { email },
            select: ['id', 'email', 'nombre', 'contrasena', 'rol', 'isVerified'] 
        });
    }

    async login(email: string, contrasena: string): Promise<{ access_token: string;  }> {
        const user = await this.verifyUser(email);
        
        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');
        if (!user.isVerified) throw new UnauthorizedException('Usuario no verificado. Por favor verifica tu correo electrónico');
        
        const payload = { sub: user.id, email: user.email, rol: user.rol,nombre: user.nombre }; 
        // const { contrasena: _, ...userWithoutPassword } = user;
        return {
            access_token: this.jwtService.sign(payload),
            // user: userWithoutPassword,
        };
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.usersRepository.findOne({ 
            where: { email },
            select: ['id', 'email', 'nombre', 'resetPasswordToken', 'resetPasswordExpires']
        });
        
        if (!user) return;
        
        const payload = { 
            sub: user.id, 
            email: user.email,
            type: 'password-reset'
        };
        const resetToken = this.jwtService.sign(payload, { expiresIn: '15m' });

        // Guardar el token y su fecha de expiración en la base de datos
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Expira en 15 minutos
        
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
            await this.emailService.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new BadRequestException('Error al enviar el correo de recuperación');
        }
    }

    async resetPassword(token: string, nuevaContrasena: string): Promise<void> {
        let decoded;
        try {
            decoded = this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Token inválido o expirado');
        }

        if (decoded.type !== 'password-reset') throw new UnauthorizedException('Token no válido para esta operación');
        
        const user = await this.usersRepository.findOne({ 
            where: { id: decoded.sub }, 
            select: ['id', 'email', 'contrasena', 'resetPasswordToken', 'resetPasswordExpires']
        });

        if (!user) throw new UnauthorizedException('Usuario no encontrado');
        if (user.resetPasswordToken !== token) throw new UnauthorizedException('Token no coincide con el registrado');
        if (!user.resetPasswordExpires || new Date() > user.resetPasswordExpires) throw new UnauthorizedException('El token ha expirado');
        

        // const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
        user.contrasena = await bcrypt.hash(nuevaContrasena, SALT);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        
        await this.usersRepository.save(user);
    }
    
    async register(registerDto:RegisterDto):Promise<User>{
        const user=await this.verifyUser(registerDto.email)
        if(user){
            throw new BadRequestException('Usuario existente')
        }
        const hashedPassword=await bcrypt.hash(registerDto.contrasena,SALT)
        const newUser={
            ...registerDto,
            contrasena:hashedPassword
        }
        return await this.usersRepository.save(newUser)
    }
  
}

