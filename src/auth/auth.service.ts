import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

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
        
        const payload = { 
            sub: user.id, 
            email: user.email, 
            rol: user.rol,
            nombre: user.nombre 
        };
        const { contrasena: _, ...userWithoutPassword } = user;

        return {
            access_token: this.jwtService.sign(payload),
            user: userWithoutPassword,
        };
    }

  
}

