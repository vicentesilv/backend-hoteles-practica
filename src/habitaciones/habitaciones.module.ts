import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from './habitaciones.entity';
import { Hotel } from 'src/hoteles/hotel.entity';
import { HabitacionesController } from './habitaciones.controller';
import { HabitacionesService } from './habitaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, Hotel])],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
  exports: [HabitacionesService],
})
export class HabitacionesModule {}
