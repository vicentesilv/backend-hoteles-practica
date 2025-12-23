import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // UserController logica de negocio aqui
    constructor(private readonly userService: UserService) {}

    // Metodos del controlador aqui
    @Get()
    getUser() {
        return "prueba exito";
    }

}
