import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HotelesModule } from './hoteles/hoteles.module';
import { ReservasModule } from './reservas/reservas.module';
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
    HotelesModule,
    ReservasModule,
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
