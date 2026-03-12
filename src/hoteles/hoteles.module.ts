import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Habitacion } from './habitaciones.entity';
import { HotelesController } from './hoteles.controller';
import { HotelesService } from './hoteles.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Habitacion]), UserService],
  controllers: [HotelesController],
  providers: [HotelesService],
  // exports: [HotelesService],

})
export class HotelesModule {
}

