import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class IdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'El id debe ser un numero entero' })
  @Min(1, { message: 'El id debe ser mayor a 0' })
  id: number;
}