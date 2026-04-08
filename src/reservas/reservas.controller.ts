import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { IdParamDto } from './dto/id-param.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createReserva(@Body() dto: CreateReservaDto) {
    return this.reservasService.createReserva(dto);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getReservaById(@Param() params: IdParamDto) {
    return this.reservasService.getReservaById(params.id);
  }
  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getAllReservas() {
    return this.reservasService.getAllReservas();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateReserva(@Param() params: IdParamDto, @Body() dto: UpdateReservaDto) {
    return this.reservasService.updateReserva(params.id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteReserva(@Param() params: IdParamDto): Promise<{ message: string }> {
    await this.reservasService.deleteReserva(params.id);
    return { message: 'Reserva eliminada' };
  }
}
