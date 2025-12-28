import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Habitacion } from "./habitaciones.entity";

@Entity()
export class Reserva{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>User, (user)=>user.id,{
        cascade: true,
    })
    idUsuario :  number;

    @OneToOne(()=>Habitacion, (habitacion)=>habitacion.id,{
        cascade:true
    })
    idHabitacion: number;

    @Column({type: 'date'})
    fechaInicio : Date;

    @Column({type: 'date'})
    fechaFin : Date;

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
 * @description tarea crear la entidad para las reservas en NestJS usando TypeORM
 * 
*/

/**
 * @entity reservas
 * @task creacion de la entidad para las reservas en NestJS usando TypeORM siguiendo el ejmplo proporcionado.
 * incluyendo los siguientes campos:
 * 
create table reserva(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NOT NULL,
    idhabitacion INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idusuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (idhabitacion) REFERENCES habitaciones(id) ON DELETE CASCADE
);
 * 
 * 
 * @param id - Identificador único del usuario.ç
 * @param idusuario - Identificador del usuario que realiza la reserva.
 * @param idhabitacion - Identificador de la habitación reservada.
 * @param fecha_inicio - Fecha de inicio de la reserva.
 * @param fecha_fin - Fecha de fin de la reserva.
 * @param fecha_reserva - Fecha y hora en que se realizó la reserva.
 * @relation idusuario - Relación con la entidad Usuario (cliente) mediante clave foránea.
 * @relation idhabitacion - Relación con la entidad Habitación mediante clave foránea.
 */
