import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity'; 
import { UserController } from './user.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [TypeOrmModule.forFeature([User])],              // + repo User
  controllers: [UserController],   
  providers: [UserService],
  exports: [TypeOrmModule, UserService],   
})
export class UserModule {
  
}
