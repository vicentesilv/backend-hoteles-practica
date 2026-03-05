import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class HotelesService {

  constructor(
          @InjectRepository(Hotel) private readonly hotelRepo: Repository<Hotel>,
      ){}

  async createHotel(dto: CreateHotelDto): Promise<Hotel> {
      const hotel = this.hotelRepo.create(dto);
      return this.hotelRepo.save(hotel);
  }


}
