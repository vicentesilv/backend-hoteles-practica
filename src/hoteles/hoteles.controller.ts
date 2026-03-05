import { Controller,Post, Get, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity'; 
import { HotelesService } from './hoteles.service';

@Controller('hoteles')
export class HotelesController {
  constructor(private readonly hotelesService: HotelesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createHotel(@Body() dto: CreateHotelDto): Promise<Hotel> {
    return this.hotelesService.createHotel(dto);
  }
}
