import { Min,IsEmail, IsString, MinLength, IsNumber, IsInt, IsNotEmpty, IsAlpha, IsNumberString, Length, IsOptional} from 'class-validator';
import { User } from 'src/user/user.entity';
import { Type } from 'class-transformer';
import { IsName } from 'src/common/decorators/IsName.decorator';

export class GetHotelDto {
  @IsNumber()
  id: number;
}

export class IdParamDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;
}

export class UpdateHotelDto {

  @IsInt({message: 'El id nuevo debe ser un numero entero'})
  @IsOptional()
  idHotelero: User;

  @IsAlpha('es-ES',{message: 'El nombre nuevo debe contener solo caracteres alfabeticos'})
  @IsOptional()
  @MinLength(3, {message: 'El nombre nuevo debe ser mayor a $constraint1 caracteres'})
  nombre: string;

  @IsString()
  @IsOptional()
  @MinLength(6, {message: 'La direccion nueva debe ser mayor a $constraint1 caracteres'})
  direccion: string;

  @IsNumberString({},{message: 'El telefono nuevo debe ser un numero'})
  @IsOptional()
  @Length(10,10, {message: 'El telefono nuevo debe tener exactamente $constraint1 caracteres'})
  telefono: string;
  
  @IsEmail({}, {message: 'El email nuevo debe ser un correo valido'})
  @IsOptional()
  email: string;

}
// - idhotelero
// - nombre
// - direccion
// - telefono
// - email

export class CreateHotelDto {
  
  @IsInt({message: 'El id debe ser un numero entero'})
  @IsNotEmpty({message: 'El id no puede estar vacio'})
  idHotelero: User;

  @IsName('es')
  @MinLength(3, {message: 'El nombre debe ser mayor a $constraint1 caracteres'})
  nombre: string;

  @IsString()
  @MinLength(6, {message: 'La direccion debe ser mayor a $constraint1 caracteres'})
  direccion: string;

  @IsNumberString({},{message: 'El telefono debe ser un numero'})
  @Length(10,10, {message: 'El telefono debe tener exactamente $constraint1 caracteres'})
  telefono: string;
  
  @IsEmail({}, {message: 'El email debe ser un correo valido'})
  email: string;

  @IsString()
  foto : string;


}