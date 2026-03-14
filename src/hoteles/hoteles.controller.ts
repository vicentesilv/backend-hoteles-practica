import { Controller,Post, Get, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateHotelDto, UpdateHotelDto, IdParamDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity'; 
import { HotelesService } from './hoteles.service';
import { CreateHabitacionDTO } from './dto/create-habitacion.dto';

@Controller('hoteles')
export class HotelesController {
  constructor(
    private readonly hotelesService: HotelesService,
  ) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getHotel(@Param() params: IdParamDto): Promise<Hotel> {
    const Hotel = await this.hotelesService.findOneById(params.id);
    if (!Hotel) throw new NotFoundException('Hotel no encontrado');
    return Hotel;
  }
  
  
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

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteHotel(@Param() params: IdParamDto): Promise<{Hotel, message: string }> {
    const Hotel = await this.hotelesService.findOneById(params.id);
    const deleted = await this.hotelesService.deleteHotel(params.id);
    if (!deleted) throw new NotFoundException('Hotel no encontrado');
    return { Hotel, message: 'Hotel eliminado' };
  }

  @Post('habitacion')
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async createHabitacion(@Body() request: CreateHabitacionDTO){
    return await this.hotelesService.createHabitacion(request);
  }
}
