import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterDto } from './dto/register.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('inicio-sesion')
  @HttpCode(HttpStatus.OK) 
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.contrasena);
  }
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto.email);
    return {
      message: 'Si el correo está registrado, se ha enviado un enlace de recuperación de contraseña.',
    };
  }
  
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.nuevaContrasena
    );
    return {
      message: 'Contraseña restablecida exitosamente',
    };
  }

  @Post('registrarse')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto:RegisterDto){
    await this.authService.register(registerDto);
    return{
      message:'Usuario registrado'
     };
  }
}
