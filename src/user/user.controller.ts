import { Controller,Post, Get, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity'; 
import { UpdateUserDto, getUserDto } from './dto/update-user.dto';
import { IdParamDto } from './dto/id-param.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    // UserController logica de conexion la logica de negocio se maneja en el servicio
    constructor(private readonly userService: UserService) {}

    /**@Get(':id')
    async getUser(@Param('id') id: number
    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async getUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: getUserDto,)
        : Promise<User> {
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
  }*/
 @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getUser(@Param() params: IdParamDto): Promise<User> {
    const user = await this.userService.findOneById(params.id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateUser(
    @Param() params: IdParamDto,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    const updated = await this.userService.updateUser(params.id, dto.email, dto.contrasena);
    if (!updated) throw new NotFoundException('Usuario no encontrado');
    return updated;
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteUser(@Param() params: IdParamDto): Promise<{ message: string }> {
    const deleted = await this.userService.deleteUser(params.id);
    if (!deleted) throw new NotFoundException('Usuario no encontrado');
    return { message: 'Usuario eliminado' };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
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
