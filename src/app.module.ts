import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SController } from './mo/s/s.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { HotelesService } from './hoteles/hoteles.service';
import { HotelesController } from './hoteles/hoteles.controller';
import { HotelesModule } from './hoteles/hoteles.module';


@Module({
  imports: [AuthModule, UserModule, HotelesModule],
  controllers: [SController, UserController, HotelesController],
  providers: [HotelesService],
})
export class AppModule {}
