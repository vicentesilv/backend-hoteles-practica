import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Habitacion } from './habitaciones.entity';
import {
  CreateHabitacionDto,
  UpdateHabitacionDto,
} from './dto/habitaciones.dto';

@Injectable()
export class HotelesService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,
  ) {}

  async findOneById(id: number): Promise<Hotel | null> {
    return this.hotelRepo.findOne({ where: { id } });
  }

  async createHotel(dto: CreateHotelDto): Promise<Hotel> {
    const hotel = this.hotelRepo.create(dto);
    return this.hotelRepo.save(hotel);
  }

  async updateHotel(
    id: number,
    email: string,
    idHotelero: User,
    nombre: string,
    direccion: string,
    telefono: string,
  ): Promise<Hotel> {
    const exists = await this.hotelRepo.exist({ where: { id } });
    if (!exists) throw new NotFoundException('Hotel no encontrado');
    const res = await this.hotelRepo.update(
      { id },
      { idHotelero, email, nombre, direccion, telefono },
    );
    if (!res.affected) throw new NotFoundException('Sin cambios');
    const updated = await this.hotelRepo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException('Hotel no encontrado');
    return updated;
  }
  async deleteHotel(id: number): Promise<boolean> {
    await this.hotelRepo.findOne({ where: { id } });
    const res = await this.hotelRepo.delete({ id });
    return !!res.affected;
  }

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
    const habitacion = await this.habitacionRepository.findOneBy({ id: id });
    if (!habitacion) {
      throw new NotFoundException('La habitacion no existe');
    }
    await this.habitacionRepository.delete(habitacion.id);
  }
}
