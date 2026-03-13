import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Habitacion } from './habitaciones.entity';
import { HotelesController } from './hoteles.controller';
import { HotelesService } from './hoteles.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Habitacion]), UserModule],
  controllers: [HotelesController],
  providers: [HotelesService],
  // exports: [HotelesService],

})
export class HotelesModule {
}

