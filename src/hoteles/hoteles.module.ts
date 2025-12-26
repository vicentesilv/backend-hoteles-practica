import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Habitacion } from './habitaciones.entity';

@Module({
    imports :[TypeOrmModule.forFeature([Hotel]),TypeOrmModule.forFeature([Habitacion])],

})
export class HotelesModule {
}
