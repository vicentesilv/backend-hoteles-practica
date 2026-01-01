import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty({message: 'El nombre es un campo obligatorio'})
    nombre: string;

    @IsEmail({},{message:'Ingresa un email valido'})
    @IsNotEmpty({message:'El email es un campo obligatorio'})
    email: string;

    @IsString()
    contrasena: string;

    @IsDateString()
    fecha_nacimiento: Date;
}