import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/create.user.dto';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
   ){}
    async create(userDTO: UserDTO) {
        return await this.userRepository.save(userDTO);
    }
    async findOneByEmail(email:string){
        return await this.userRepository.findOneBy({email})
    }
}
