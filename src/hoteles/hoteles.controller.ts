import { Body,Controller,Delete,Get,NotFoundException,Param,ParseIntPipe,Post,Put,UploadedFile,UseGuards,UseInterceptors,UsePipes,ValidationPipe} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlinkSync } from 'fs';
import { getHotelImageUploadOptions } from 'src/config/images';
import { CreateHotelDto,IdParamDto,UpdateHotelDto} from './dto/create-hotel.dto';
import { CreateHabitacionDto,UpdateHabitacionDto} from 'src/habitaciones/dto/habitaciones.dto';
import { Hotel } from './hotel.entity';
import { HabitacionesService } from 'src/habitaciones/habitaciones.service';
import { HotelesService } from './hoteles.service';
import { join } from 'path';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRol } from 'src/user/user.entity';

@Controller('hoteles')
export class HotelesController {
  constructor(
    private readonly hotelesService: HotelesService,
    private readonly habitacionesService: HabitacionesService,
  ) {}

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.HOTELERO)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.HOTELERO)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.HOTELERO)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.HOTELERO)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createHabitacionLegacy(@Body() request: CreateHabitacionDto) {
    return await this.habitacionesService.createHabitacion(request);
  }

  @Put('habitacion/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.HOTELERO)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateHabitacionLegacy(
    @Body() request: UpdateHabitacionDto,
    @Param() id: IdParamDto,
  ) {
    return await this.habitacionesService.updateHabitacion(request, id.id);
  }

  @Delete('habitacion/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.HOTELERO)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteHabitacionLegacy(@Param() id: IdParamDto) {
    return await this.habitacionesService.deleteHabitacion(id.id);
  }

  @Get(':id/habitacion')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getAllHabitacionLegacy(@Param() hotelId: IdParamDto) {
    const rooms = await this.habitacionesService.getAllHabitaciones(hotelId.id);
    if (rooms.length === 0) {
      throw new NotFoundException('No existen habitaciones');
    }
    return rooms;
  }

  @Get(':hotelId/habitacion/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getHabitacionLegacy(
    @Param('id', ParseIntPipe) id: number,
    @Param('hotelId', ParseIntPipe) hotelId: number,
  ) {
    return await this.habitacionesService.getHabitacion(id, hotelId);
  }
}
