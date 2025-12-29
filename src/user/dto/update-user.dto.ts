import { IsEmail, IsString, MinLength, IsNumber } from 'class-validator';

export class getUserDto {
  @IsNumber()
  id: number;
}

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  contrasena: string;
}