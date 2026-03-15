import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto, UpdateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Habitacion } from './habitaciones.entity';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class HotelesService {

  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,
    private readonly userService: UserService,
  ) { }

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
    const hotel = await this.hotelRepo.findOneBy({id: request.idHotel});
    if (!hotel) {
      throw new NotFoundException('El hotel no existe');
    }

    const habitacion = this.habitacionRepository.create({
      idhotel: hotel,
      numhabitacion: request.numhabitacion,
      tipo: request.tipo,
      capacidad: request.capacidad,
      precio: request.precio,
      descripcion: request.descripcion
    });
    return this.habitacionRepository.save(habitacion);
  }
}

