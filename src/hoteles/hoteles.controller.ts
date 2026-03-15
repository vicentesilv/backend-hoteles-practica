import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateHotelDto, UpdateHotelDto, IdParamDto } from './dto/create-hotel.dto';
import { Hotel } from './hotel.entity'; 
import { HotelesService } from './hoteles.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';

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
  @Get()
  async getAllHoteles():Promise<Hotel[]>{
    return this.hotelesService.findAllHoteles();
  }
  
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'hoteles');
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          const fileName = `hotel-${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Solo se permiten imágenes JPG, JPEG, PNG o WEBP'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async createHotel(@Body() dto: CreateHotelDto, @UploadedFile() file?: { filename?: string }): Promise<Hotel> {
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
  async createHabitacion(@Body() request: CreateHabitacionDto){
    return await this.hotelesService.createHabitacion(request);
  }
}
