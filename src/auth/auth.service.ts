import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
    ){}

    async register(registerDTO:RegisterDTO){
        await this.validateUserIsUnique(registerDTO);
        let user=registerDTO;
        user.contrasena=await this.encryptPassword(registerDTO.contrasena)
        return await this.userService.create(user)
    }

    async encryptPassword(password:string){
        const ITERACIONES_SAL=10;
        return await bcrypt.hash(password,ITERACIONES_SAL);
    }

    async validateUserIsUnique(registerDTO:RegisterDTO){
        const user=await this.userService.findOneByEmail(registerDTO.email)
        if(user){
            throw new BadRequestException('User already exists')
        }
    }
}
