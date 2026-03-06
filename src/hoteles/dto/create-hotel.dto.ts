import { IsEmail, IsString, MinLength, IsNumber, IsInt, IsNotEmpty, IsAlpha, IsNumberString, Length} from 'class-validator';
import { User } from 'src/user/user.entity';


export class CreateHotelDto {
  
  @IsInt({message: 'El id del hotelero debe ser un numero entero'})
  @IsNotEmpty({message: 'El id del hotelero no puede estar vacio'})
  idHotelero: User;

  @IsAlpha('es-ES',{message: 'El nombre debe contener solo caracteres alfabeticos'})
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
