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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, join, unlinkSync } from 'fs';
import { getHotelImageUploadOptions } from 'src/config/images';
import {
  CreateHotelDto,
  IdParamDto,
  UpdateHotelDto,
} from './dto/create-hotel.dto';
import {
  CreateHabitacionDto,
  UpdateHabitacionDto,
} from './dto/habitaciones.dto';
import { Hotel } from './hotel.entity';
import { HotelesService } from './hoteles.service';

@Controller('hoteles')
export class HotelesController {
  constructor(private readonly hotelesService: HotelesService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getHotel(@Param() params: IdParamDto): Promise<Hotel> {
    const Hotel = await this.hotelesService.findOneById(params.id);
    if (!Hotel) throw new NotFoundException('Hotel no encontrado');
    return Hotel;
  }

  @Get()
  async getAllHoteles(): Promise<Hotel[]> {
    return this.hotelesService.findAllHoteles();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @UseInterceptors(FileInterceptor('foto', getHotelImageUploadOptions()))
  async createHotel(
    @Body() dto: CreateHotelDto,
    @UploadedFile() file?: { filename?: string },
  ): Promise<Hotel> {
    if (file?.filename) {
      dto.foto = `/uploads/hoteles/${file.filename}`;
    }

    try {
      return await this.hotelesService.createHotel(dto);
    } catch (error) {
      if (file?.filename) {
        const filePath = join(process.cwd(), 'uploads', 'hoteles', file.filename);
        if (existsSync(filePath)) {
          unlinkSync(filePath);
        }
      }
      throw error;
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @UseInterceptors(FileInterceptor('foto', getHotelImageUploadOptions()))
  async updateHotel(
    @Param() params: IdParamDto,
    @Body() dto: UpdateHotelDto,
    @UploadedFile() file?: { filename?: string },
  ): Promise<Hotel> {
    const currentHotel = await this.hotelesService.findOneById(params.id);
    if (!currentHotel) throw new NotFoundException('Hotel no encontrado');

    if (file?.filename) {
      dto.foto = `/uploads/hoteles/${file.filename}`;
    }

    let updated: Hotel | null = null;
    try {
      updated = await this.hotelesService.updateHotel(params.id, dto);
    } catch (error) {
      if (file?.filename) {
        const uploadedFilePath = join(process.cwd(), 'uploads', 'hoteles', file.filename);
        if (existsSync(uploadedFilePath)) {
          unlinkSync(uploadedFilePath);
        }
      }
      throw error;
    }

    if (!updated) throw new NotFoundException('Hotel no encontrado');

    if (file?.filename && currentHotel.foto && currentHotel.foto !== updated.foto) {
      const oldPhotoName = currentHotel.foto.split('/').pop();
      if (oldPhotoName) {
        const oldFilePath = join(process.cwd(), 'uploads', 'hoteles', oldPhotoName);
        if (existsSync(oldFilePath)) {
          unlinkSync(oldFilePath);
        }
      }
    }

    return updated;
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteHotel(
    @Param() params: IdParamDto,
  ): Promise<{ Hotel; message: string }> {
    const Hotel = await this.hotelesService.findOneById(params.id);
    const deleted = await this.hotelesService.deleteHotel(params.id);
    if (!deleted) throw new NotFoundException('Hotel no encontrado');

    if (Hotel?.foto) {
      const oldPhotoName = Hotel.foto.split('/').pop();
      if (oldPhotoName) {
        const oldFilePath = join(process.cwd(), 'uploads', 'hoteles', oldPhotoName);
        if (existsSync(oldFilePath)) {
          unlinkSync(oldFilePath);
        }
      }
    }

    return { Hotel, message: 'Hotel eliminado' };
  }




  @Post('habitacion')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createHabitacion(@Body() request: CreateHabitacionDto) {
    return await this.hotelesService.createHabitacion(request);
  }

  @Put('habitacion/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateHabitacion(
    @Body()
    request: UpdateHabitacionDto,
    @Param()
    id: IdParamDto,
  ) {
    return await this.hotelesService.updateHabitacion(request, id.id);
  }

  @Delete('habitacion/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteHabitacion(
    @Param()
    id: IdParamDto,
  ) {
    return await this.hotelesService.deleteHabitacion(id.id);
  }
  @Get(':id/habitacion')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getAllHabitacion(
    @Param()
    hotelId: IdParamDto,
  ) {
    const rooms = await this.hotelesService.getAllHabitaciones(hotelId.id);
    if (rooms.length == 0) {
      throw new NotFoundException('No existen habitaciones');
    }
    return rooms;
  }

  @Get(':hotelId/habitacion/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getHabitacion(
    @Param('id', ParseIntPipe)
    id: number,
    @Param('hotelId', ParseIntPipe)
    hotelId: number,
  ) {
    return await this.hotelesService.getHabitacion(id, hotelId);
  }
}
