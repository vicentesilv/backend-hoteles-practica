import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createReserva(@Body() dto: CreateReservaDto) {
    return this.reservasService.createReserva(dto);
  }
}
