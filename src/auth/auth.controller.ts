import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
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
     * @description Controlador de inicio de sesion basico para la aplicacion
     * usa el metodo @Post de @nestjs/common para la creacion del endpoint de registro
     * 
     * @task {
     *  - crear el endpoint login para iniciar sesion de usuarios
     *  - usar DTOs para validar la entrada de datos {email, contrasena}
     *  - manejar la logica con la conexion a la base de datos usando TypeORM en el auth.service.ts
     *  - retornar un mensaje de exito o error segun corresponda
     *  - comprobar las contrasenas usando bcrypt antes de compararlas en la base de datos
     *  - manejar errores comunes como usuario no existente, contrasena incorrecta, etc.
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
     * @description resetear la contrasena de un usuario y enviar un correo de recuperacion
     * 
     * @task {
     *  - crear el endpoint forgot-password para enviar un correo de recuperacion
     *  - crear el endpoint reset-password para resetear la contrasena de un usuario
     *  - usar DTOs para validar la entrada de datos {email}
     *  - todas estas tareas deben ser terminada cuando se empiece el frontend del proyecto
     *       
     */



}


