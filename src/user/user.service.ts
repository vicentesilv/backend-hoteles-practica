import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ){}

    async findOneById(id: number): Promise<User | null> {
        return this.userRepo.findOne({ where: { id } });
    }
    
    /**async updateUser(id: number, email: string, contrasena: string): Promise<User | null> {
        const res = await this.userRepo.update({ id }, { email, contrasena });
        if (!res.affected) throw new NotFoundException('No se cambio ningun valor');
    return this.userRepo.findOne({ where: { id } });
    }
    */
    async updateUser(id: number, email: string, contrasena: string): Promise<User> {
        const exists = await this.userRepo.exist({ where: { id } });
        if (!exists) throw new NotFoundException('Usuario no encontrado');

        const res = await this.userRepo.update({ id }, { email, contrasena });
        if (!res.affected) throw new NotFoundException('Sin cambios');

        const updated = await this.userRepo.findOne({ where: { id } });
        if (!updated) throw new NotFoundException('Usuario no encontrado');
    return updated;
    }
}
