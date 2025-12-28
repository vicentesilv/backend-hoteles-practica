import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDTO{
    @IsString()
    nombre:string;

    @IsEmail()
    email:string;

    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(8)
    contrasena:string;

    @IsDate()
    fecha_nacimiento:Date;
}