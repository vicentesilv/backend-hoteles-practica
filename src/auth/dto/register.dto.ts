import {IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty({message: 'El nombre es un campo obligatorio'})
    nombre: string;

    @IsEmail({},{message:'Ingresa un email valido'})
    @IsNotEmpty({message:'El email es un campo obligatorio'})
    email: string;

    @IsString()
    @IsNotEmpty({message:'La contraseña es un campo obligatorio'})
    @MinLength(8)
    contrasena: string;

    @IsNotEmpty({message:'La fecha de nacimiento es un campo obligatorio'})
    @IsDateString({},{message:'La fecha de nacimiento debe estar un formato compatible'})
    fecha_nacimiento: Date;
}