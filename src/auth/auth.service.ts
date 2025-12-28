import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
    ){}

    async register(registerDTO:RegisterDTO){
        const contrasenaHashed=await this.encryptPassword(registerDTO.contrasena);
        const user=this.findOneByEmail(registerDTO.email)
        if(user){
            throw new BadRequestException('User already exists')
        }
       
        return this.userRepository.save(user);
    }

    async encryptPassword(password:string){
        const ITERACIONES_SAL=10;
        return await bcrypt.hash(password,ITERACIONES_SAL);
    }
    async findOneByEmail(email:string){
        return await this.userRepository.findOneBy({email});
    }
}
