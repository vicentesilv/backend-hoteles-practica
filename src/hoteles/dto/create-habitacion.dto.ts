import {
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  IsOptional
} from "class-validator";
import { TipoHabitacion } from "../habitaciones.entity";

export class CreateHabitacionDTO {
  @IsNotEmpty({ message: 'La habitacion necesita un hotel' })
  @IsInt({ message: 'El id neesita ser un entero' })
  idHotel: number;

  @IsNotEmpty({ message: 'La habitacion debe tener un numero' })
  @IsInt({ message: 'El numero tiene que ser un entero' })
  numhabitacion: number;

  @IsEnum(TipoHabitacion, { message: 'Escoge un tipo valido' })
  @IsNotEmpty({ message: 'El tipo de habitacion no puede estar vacio' })
  tipo: TipoHabitacion;

  @IsNotEmpty({ message: 'La capacidad no puede estar vacia' })
  @IsInt({ message: 'La capacidad tiene que ser un numero entero' })
  capacidad: number;

  @IsNotEmpty({ message: 'El precio no puede estar vacio' })
  @IsNumber({}, { message: 'El precio tiene que ser un numero' })
  precio: number;

  @IsOptional()
  @IsString({ message: 'La descripcion tiene que ser un texto' })
  @MaxLength(255, { message: 'El maximo de caracteres es $constraint1' })
  descripcion: string;
}
