import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // UserController logica de conexion la logica de negocio se maneja en el servicio
    constructor(private readonly userService: UserService) {}

    // Metodos del controlador aqui
    // @Get('test')
    // getejemplo() {
    //     return "prueba exito";
    // }

}
