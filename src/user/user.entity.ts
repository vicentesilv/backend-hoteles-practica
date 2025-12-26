import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRol {
  CLIENTE = 'cliente',
  HOTELERO = 'hotelero',
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 150 })
    nombre: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false, select: false })
    contrasena: string;

    @Column({ type: 'date'})
    fecha_nacimiento: Date;

    @Column({ type: 'varchar', enum: UserRol, default: UserRol.CLIENTE, nullable: false })
    rol: string;

    @Column({ type: 'varchar', length: 512, select: false})
    jwtVerificationToken: string;

    @Column({ type: 'boolean', default: false})
    isVerified: boolean;

    @Column({ type: 'timestamp'})
    fecha_registro: Date;

}
/**aqui les dejo un ejemplo de como manejar las entidades en NestJS usando TypeORM
 * import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
 * import { Reserva } from '../hoteles/reserva.entity';
 * 
 * @Entity('users')
 * export class User {
 *  @PrimaryGeneratedColumn()
 *  id: number;
 * 
 * @Column({ unique: true, type: 'varchar', length: 100,nullable: false })
 * email: string;
 * 
 * @Column({ type: 'varchar', length: 255, nullable: false })
 * password: string;
 * 
 * @Column()
 * name: string;
 * 
 * @column({ type: 'date', nullable: true })
 * fecha_nacimiento: Date;
 * 
 * @column({
 * type: 'enum',
 * enum: ['cliente', 'hotelero'],
 * default: 'cliente',
 * } )
 * role: 'cliente' | 'hotelero';
 * 
 * @createDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 * fecha_registro: Date;
 * 
 * @oneToMany(() => Reserva, (reserva) => reserva.user)
 * reservas: Reserva[];
 * } algo asi seria una entidad de usuario en NestJS con TypeORM en el caso de este archivo no se necesita ninguna relacion
 * 
 */


/**@author alberto brodden 
 * @description tarea crear la entidad para los usuarios en NestJS usando TypeORM
 * 
*/

/**
 * @entity user
 * @task creacion de la entidad para los usuarios en NestJS usando TypeORM siguiendo el ejmplo proporcionado.
 * incluyendo los siguientes campos:
 * 
 * @param id - Identificador único del usuario.
 * @param nombre - Nombre completo del usuario.
 * @param email - Correo electrónico del usuario.
 * @param contrasena - Contraseña del usuario.
 * @param fecha_nacimiento - Fecha de nacimiento del usuario.
 * @param rol - Rol del usuario, puede ser 'cliente' o 'hotelero'.
 * @param jwtVerificationToken - Token de verificación JWT para el usuario.
 * @param isVerified - Indica si el usuario ha verificado su cuenta.
 * @param fecha_registro - Fecha y hora en que el usuario se registró en el sistema.

 */
