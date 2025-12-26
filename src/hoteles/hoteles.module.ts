import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';

@Module({
    imports :[TypeOrmModule.forFeature([Hotel])]
})
export class HotelesModule {
}
