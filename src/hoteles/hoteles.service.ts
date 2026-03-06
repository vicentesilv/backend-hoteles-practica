import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class HotelesService {

  constructor(
          @InjectRepository(Hotel) private readonly hotelRepo: Repository<Hotel>,
      ){}

  async findOneById(id: number): Promise<Hotel | null> {
       return this.hotelRepo.findOne({ where: { id } });
  }

  async createHotel(dto: CreateHotelDto): Promise<Hotel> {
      const hotel = this.hotelRepo.create(dto);
      return this.hotelRepo.save(hotel);
  }

  async updateHotel(id: number, email: string, idHotelero: User, nombre: string, direccion: string, telefono: string): Promise<Hotel> {
          const exists = await this.hotelRepo.exist({ where: { id } });
          if (!exists) throw new NotFoundException('Hotel no encontrado');
          const res = await this.hotelRepo.update({ id }, { idHotelero, email, nombre, direccion, telefono });
          if (!res.affected) throw new NotFoundException('Sin cambios');
  
          const updated = await this.hotelRepo.findOne({ where: { id } });
          if (!updated) throw new NotFoundException('Hotel no encontrado');
      return updated;
      }

// - idhotelero
// - nombre
// - direccion
// - telefono
// - email

}

