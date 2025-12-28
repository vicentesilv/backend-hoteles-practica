import { Controller, Get, Put, Param, Body, ParseIntPipe, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity'; 
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    // UserController logica de conexion la logica de negocio se maneja en el servicio
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User> {
        const User = await this.userService.findOneById(id);
        if (!User) throw new NotFoundException('Usuario no encontrado');
        return User;
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
        const updated = await this.userService.updateUser(id, dto.email, dto.contrasena);
        if (!updated) throw new NotFoundException('Usuario no encontrado');
        return updated;
  }
    // Metodos del controlador aqui
    // @Get('test')
    // getejemplo() {
    //     return "prueba exito";
    // }

    /**
     * @member alberto brodden
     * @mensaje brodden te estoy dejando el modulo de usuario a ti solo si ocupas ayuda o te atoras en algo me avisas.
     * @description Controlador de usuario basico para la aplicacion
     * usa el metodo @Get de @nestjs/common para la creacion del endpoint de prueba
     * @task {
     *  - crear el endpoint getUser para obtener los datos de un usuario
     *  - crear el endpoint updateUser para actualizar los datos de un usuario {contraseña,email} los demas no se pueden actualizar
     *  - crear el endpoint deleteUser para eliminar un usuario
     *  - usar DTOs para validar la entrada de datos {id,email, contrasena} segun corresponda
     *  - manejar la logica con la conexion a la base de datos usando TypeORM en el user.service.ts
     *  - retornar un mensaje de exito o error segun corresponda
     *  - manejar errores comunes como usuario no existente, etc.
     *  - usa el servicio UserService para la logica de negocio mediante inyeccion de dependencias eje,mplo:
     *     constructor(private readonly userService: UserService) {}
     * }
     * 
     */

}
