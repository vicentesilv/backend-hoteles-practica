import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from 'src/habitaciones/habitaciones.entity';
import { Reserva } from './reservas.entity';
import { User } from 'src/user/user.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepo: Repository<Reserva>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Habitacion)
    private readonly habitacionRepo: Repository<Habitacion>,
  ) {}

  async createReserva(dto: CreateReservaDto): Promise<Reserva> {
    if (dto.fechainicio > dto.fechafin) {
      throw new BadRequestException(
        'La fechainicio no puede ser mayor que la fechafin',
      );
    }

    const usuario = await this.userRepo.findOne({ where: { id: dto.idusuario } });
    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }

    const habitacion = await this.habitacionRepo.findOne({
      where: { id: dto.idhabitacion },
    });
    if (!habitacion) {
      throw new NotFoundException('La habitacion no existe');
    }

    const reserva = this.reservaRepo.create({
      idUsuario: usuario,
      idHabitacion: habitacion,
      fechaInicio: dto.fechainicio,
      fechaFin: dto.fechafin,
    });

    return this.reservaRepo.save(reserva);
  }
}
