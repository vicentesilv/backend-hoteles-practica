import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { HotelesService } from './hoteles/hoteles.service';
import { HotelesController } from './hoteles/hoteles.controller';
import { HotelesModule } from './hoteles/hoteles.module';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormconfig';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UserModule,
    HotelesModule],
  controllers: [UserController, HotelesController,AuthController],
  providers: [HotelesService,UserService,AuthService],

})
export class AppModule {}
