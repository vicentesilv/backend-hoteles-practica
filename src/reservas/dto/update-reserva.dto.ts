import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UpdateReservaDto {
  @Type(() => Date)
  @IsDate({ message: 'La fechainicio debe ser una fecha valida' })
  fechainicio: Date;

  @Type(() => Date)
  @IsDate({ message: 'La fechafin debe ser una fecha valida' })
  fechafin: Date;
}