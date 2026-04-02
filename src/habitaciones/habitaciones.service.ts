import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from './habitaciones.entity';
import { Hotel } from 'src/hoteles/hotel.entity';
import {
  CreateHabitacionDto,
  UpdateHabitacionDto,
} from './dto/habitaciones.dto';

@Injectable()
export class HabitacionesService {
  constructor(
    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
  ) {}

  async createHabitacion(request: CreateHabitacionDto): Promise<Habitacion> {
    const hotel = await this.hotelRepo.findOneBy({ id: request.idHotel });
    if (!hotel) {
      throw new NotFoundException('El hotel no existe');
    }

    const habitacion = this.habitacionRepository.create({
      idHotel: hotel,
      numHabitacion: request.numHabitacion,
      tipo: request.tipo,
      capacidad: request.capacidad,
      precio: request.precio,
      descripcion: request.descripcion,
    });

    return this.habitacionRepository.save(habitacion);
  }

  async updateHabitacion(request: UpdateHabitacionDto, id: number) {
    const habitacion = await this.habitacionRepository.findOne({
      where: { id },
      relations: { idHotel: true },
    });

    if (!habitacion) {
      throw new NotFoundException('La habitacion no existe');
    }

    let hotelAsignado = habitacion.idHotel;
    if (request.idHotel != null) {
      const hotelFromHabitacion = await this.hotelRepo.findOneBy({
        id: request.idHotel,
      });
      if (!hotelFromHabitacion) {
        throw new NotFoundException('El hotel no existe');
      }
      hotelAsignado = hotelFromHabitacion;
    }

    const updatedHabitacion = this.habitacionRepository.merge(habitacion, {
      idHotel: hotelAsignado,
      numHabitacion: request.numHabitacion ?? habitacion.numHabitacion,
      tipo: request.tipo ?? habitacion.tipo,
      capacidad: request.capacidad ?? habitacion.capacidad,
      estado: request.estado ?? habitacion.estado,
      precio: request.precio ?? habitacion.precio,
      descripcion: request.descripcion ?? habitacion.descripcion,
    });

    return this.habitacionRepository.save(updatedHabitacion);
  }

  async deleteHabitacion(id: number) {
    const habitacion = await this.habitacionRepository.findOneBy({ id });
    if (!habitacion) {
      throw new NotFoundException('La habitacion no existe');
    }
    await this.habitacionRepository.delete(habitacion.id);
  }

  async getHabitacion(id: number, hotelId: number) {
    const habitacion = await this.habitacionRepository.findOne({
      where: {
        id,
        idHotel: { id: hotelId },
      },
    });
    if (!habitacion) {
      throw new NotFoundException('La habitacion no existe');
    }
    return habitacion;
  }

  async getAllHabitaciones(hotelId: number) {
    const hotel = await this.hotelRepo.findOne({
      where: { id: hotelId },
      relations: { habitaciones: true },
    });
    if (!hotel) {
      throw new NotFoundException('El hotel vinculado no existe');
    }
    return hotel.habitaciones;
  }
}
