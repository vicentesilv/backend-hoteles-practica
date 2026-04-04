import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateReservaDto {
  @Type(() => Number)
  @IsInt({ message: 'El idusuario debe ser un numero entero' })
  @Min(1, { message: 'El idusuario debe ser mayor a 0' })
  idusuario: number;

  @Type(() => Number)
  @IsInt({ message: 'El idhabitacion debe ser un numero entero' })
  @Min(1, { message: 'El idhabitacion debe ser mayor a 0' })
  idhabitacion: number;

  @Type(() => Date)
  @IsDate({ message: 'La fechainicio debe ser una fecha valida' })
  fechainicio: Date;

  @Type(() => Date)
  @IsDate({ message: 'La fechafin debe ser una fecha valida' })
  fechafin: Date;

  @IsString({ message: 'El paymentMethodId debe ser un texto' })
  @IsNotEmpty({ message: 'El paymentMethodId es obligatorio' })
  paymentMethodId: string;
}
