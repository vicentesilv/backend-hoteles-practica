import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto, UpdateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from './habitaciones.entity';
import { UserService } from 'src/user/user.service';
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
    private readonly userService: UserService,
  ) {}

  async findOneById(id: number): Promise<Hotel | null> {
    return this.hotelRepo.findOne({ where: { id } });
  }

  async findAllHoteles(): Promise<Hotel[]> {
    return this.hotelRepo.find();
  }

  async createHotel(dto: CreateHotelDto): Promise<Hotel> {
    const user = await this.userService.findOneById(dto.idHotelero);
    if (!user) {
      throw new NotFoundException('El usuario hotelero no existe');
    }

    const hotel = this.hotelRepo.create({
      ...dto,
      idHotelero: user,
    });
    return this.hotelRepo.save(hotel);
  }

  async updateHotel(id: number, dto: UpdateHotelDto): Promise<Hotel> {
    const exists = await this.hotelRepo.exist({ where: { id } });
    if (!exists) throw new NotFoundException('Hotel no encontrado');

    const payload: Partial<Hotel> = {};

    if (dto.email !== undefined) payload.email = dto.email;
    if (dto.nombre !== undefined) payload.nombre = dto.nombre;
    if (dto.direccion !== undefined) payload.direccion = dto.direccion;
    if (dto.telefono !== undefined) payload.telefono = dto.telefono;
    if (dto.foto !== undefined) payload.foto = dto.foto;

    if (dto.idHotelero !== undefined) {
      const user = await this.userService.findOneById(dto.idHotelero);
      if (!user) {
        throw new NotFoundException('El usuario hotelero no existe');
      }
      payload.idHotelero = user;
    }

    const res = await this.hotelRepo.update({ id }, payload);
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

  async getHabitacion(id: number, hotelId: number) {
    const habitacion = await this.habitacionRepository.findOne({
      where: {
        id: id,
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
