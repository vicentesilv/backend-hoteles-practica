import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelesService {


  async findOneById(id: number): Promise<Hotel | null> {
       return this.hotelRepo.findOne({ where: { id } });
  }

  async createHotel(dto: CreateHotelDto): Promise<Hotel> {
      const hotel = this.hotelRepo.create(dto);
      return this.hotelRepo.save(hotel);
  }

  async updateHotel(id: number, email: string, idHotelero: User, nombre: string, direccion: string, telefono: string): Promise<Hotel> {
          const exists = await this.hotelRepo.exist({ where: { id } });
          if (!exists) throw new NotFoundException('Hotel no encontrado');
          const res = await this.hotelRepo.update({ id }, { idHotelero, email, nombre, direccion, telefono });
          if (!res.affected) throw new NotFoundException('Sin cambios');
  
          const updated = await this.hotelRepo.findOne({ where: { id } });
          if (!updated) throw new NotFoundException('Hotel no encontrado');
      return updated;
      }

// - idhotelero
// - nombre
// - direccion
// - telefono
// - email

}
