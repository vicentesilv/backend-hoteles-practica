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


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @Post('register')
  //   @HttpCode(HttpStatus.CREATED)
  //   async register(@Body() registerDto: RegisterDto) {
  //     const user = await this.authService.register(registerDto);
  //     const { contrasena, jwtVerificationToken, ...result } = user;
  //     return {
  //       message: 'Usuario registrado exitosamente. Por favor verifica tu correo electrónico.',
  //       user: result,
  //     };
  //   }

  /**
     * @member mario astorga
     * @description Controlador de registro basico para la aplicacion
     * usa el metodo @Post de @nestjs/common para la creacion del endpoint de registro
     * 
     * @task {
     *  - crear el endpoint register para registrar nuevos usuarios
     *  - usar DTOs para validar la entrada de datos {todos los campos del entity user}
     *  - manejar la logica con la conexion a la base de datos usando TypeORM en el auth.service.ts
     *  - retornar un mensaje de exito o error segun corresponda
     *  - proteger las contrasenas usando bcrypt antes de guardarlas en la base de datos
     *  - manejar errores comunes como usuario ya existente, datos invalidos, etc.
     *  - usa el servicio AuthService para la logica de negocio mediante inyeccion de dependencias eje,mplo:
     *     constructor(private readonly authService: AuthService) {}
     * }
     * @member vicente silva
     * @subtask {
     * antes del registro mandar un correo de verificacion al usuario
     * - usar un servicio de correo como nodemailer o sendgrid
     *  - enviar un enlace de verificacion al correo del usuario {
     *    - el enlace debe contener los datos registrados para que al hacer click en confirmar usuario
     *   se registr el usuario en la base de datos
     *   - el enlace debe tener un token de verificacion unico para evitar ataques de phishing
     *    - el enlace debe tener una fecha de expiracion para evitar que se use despues de un tiempo
     *  }
     *  - manejar errores comunes como correo invalido, error al enviar correo, etc.
     *  - usa el servicio AuthService para la logica de negocio mediante inyeccion de dependencias eje,mplo:
     *     constructor(private readonly authService: AuthService) {}
     * }
     * 
     * ejemplo de la definicion del endpoint:
        @Get('test')
        getEjemplo() {
            return "prueba exito";
        }
     * 
     */


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
}
