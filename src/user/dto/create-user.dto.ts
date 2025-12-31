import { IsEmail, IsString, MinLength, IsDateString, IsEnum } from 'class-validator';
import { UserRol } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsDateString()
  fecha_nacimiento: string;

  @IsEnum(UserRol)
  rol: UserRol;
}