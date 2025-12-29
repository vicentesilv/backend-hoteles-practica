import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers:[UserController],
  exports:[UserService],
  imports:[TypeOrmModule.forFeature([User])]
})
export class UserModule {
  
}
