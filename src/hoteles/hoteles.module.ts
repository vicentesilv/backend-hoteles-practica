import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelesController } from './hoteles.controller';
import { HotelesService } from './hoteles.service';
import { UserModule } from 'src/user/user.module';
import { HabitacionesModule } from 'src/habitaciones/habitaciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), UserModule, HabitacionesModule],
  controllers: [HotelesController],
  providers: [HotelesService],
})
export class HotelesModule {}

