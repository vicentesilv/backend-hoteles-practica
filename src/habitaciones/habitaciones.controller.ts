import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdParamDto } from 'src/hoteles/dto/create-hotel.dto';
import {
  CreateHabitacionDto,
  UpdateHabitacionDto,
} from './dto/habitaciones.dto';
import { HabitacionesService } from './habitaciones.service';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createHabitacion(@Body() request: CreateHabitacionDto) {
    return await this.habitacionesService.createHabitacion(request);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateHabitacion(
    @Body() request: UpdateHabitacionDto,
    @Param() id: IdParamDto,
  ) {
    return await this.habitacionesService.updateHabitacion(request, id.id);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteHabitacion(@Param() id: IdParamDto) {
    return await this.habitacionesService.deleteHabitacion(id.id);
  }

  @Get('hotel/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getAllHabitacion(@Param() hotelId: IdParamDto) {
    const rooms = await this.habitacionesService.getAllHabitaciones(hotelId.id);
    if (rooms.length === 0) {
      throw new NotFoundException('No existen habitaciones');
    }
    return rooms;
  }

  @Get('hotel/:hotelId/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getHabitacion(
    @Param('id', ParseIntPipe) id: number,
    @Param('hotelId', ParseIntPipe) hotelId: number,
  ) {
    return await this.habitacionesService.getHabitacion(id, hotelId);
  }
}
