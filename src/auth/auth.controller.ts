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
import { ConfirmRegisterDto } from './dto/confirm-register.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 
   * @member vicente silva 
   * @endpoint inicio-sesion
   * @description Inicia sesión de un usuario con email y contraseña
   * @param loginDto - DTO con el email y la contraseña del usuario
   * @return Token JWT si las credenciales son válidas | error si no lo son
  */ 
  @Post('inicio-sesion')
  @HttpCode(HttpStatus.OK) 
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.contrasena);
  }

  /** 
   * @member vicente silva 
   * @endpoint forgot-password
   * @description Solicita recuperación de contraseña enviando un email con un JWT
   * @param forgotPasswordDto - DTO con el email del usuario
   * @return Mensaje indicando que se ha enviado el email si el usuario existe
   */
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto.email);
    return {
      message: 'Si el correo está registrado, se ha enviado un enlace de recuperación de contraseña.',
    };
  }
  
  /**
   * @member vicente silva
   * @endpoint reset-password
   * @description Resetea la contraseña verificando el JWT del email y comparándolo con la BD
   * @param resetPasswordDto - DTO con el token y la nueva contraseña
   * @return Mensaje indicando que la contraseña ha sido restablecida exitosamente ademas de actualizar la BD
   */
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

  /**
   * @member mario astorga
   * @endpoint registrarse
   * @description Registra un nuevo usuario y envía un email de confirmación con un JWT
   * @param registerDto - DTO con los datos del nuevo usuario
   * @return Mensaje indicando que se ha enviado el email de confirmación
   */
  @Post('registrarse')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      message: 'Se ha enviado un correo de confirmación. Por favor revisa tu bandeja de entrada.',
    };
  }

  /**
   * @member vicente silva
   * @endpoint confirmar-registro
   * @description Confirma el registro de un usuario verificando el JWT del email
   * @param confirmRegisterDto - DTO con el token JWT enviado por correo
   * @return Usuario registrado y mensaje de confirmación
   */
  @Post('confirmar-registro')
  @HttpCode(HttpStatus.CREATED)
  async confirmRegister(@Body() confirmRegisterDto: ConfirmRegisterDto) {
    const user = await this.authService.confirmRegister(confirmRegisterDto.token);
    return {
      message: 'Registro confirmado exitosamente',
      user,
    };
  }
}
