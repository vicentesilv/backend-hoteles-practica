import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Habitacion } from './habitaciones.entity';
import { HotelesController } from './hoteles.controller';
import { HotelesService } from './hoteles.service';

@Module({
    imports :[TypeOrmModule.forFeature([Hotel]),TypeOrmModule.forFeature([Habitacion])],
    controllers: [HotelesController],
    providers: [HotelesService]

})
export class HotelesModule {
}
