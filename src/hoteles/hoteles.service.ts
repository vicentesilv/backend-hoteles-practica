import { Injectable } from '@nestjs/common';
import { CreateHabitacionDTO } from './dto/create-habitacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from './habitaciones.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelesService {
  constructor(
    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>
  )
  function registrarHabitacion(request: CreateHabitacionDTO) {
  this.habitacionRepository.save()
}

}
