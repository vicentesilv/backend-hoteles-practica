import { Controller,Post, Get, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateHotelDto, UpdateHotelDto, IdParamDto } from './dto/create-hotel.dto';
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

  @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async updateHotel(
      @Param() params: IdParamDto,
      @Body() dto: UpdateHotelDto,
    ): Promise<Hotel> {
      const updated = await this.hotelesService.updateHotel(params.id, dto.email, dto.idHotelero, dto.nombre, dto.direccion, dto.telefono);
      if (!updated) throw new NotFoundException('Hotel no encontrado');
      return updated;
    }
  }