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



}


