import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>User, (user)=>user.id,{
        cascade: true,
    })
    idHotelero :  number;

    @Column()
    nombre : string;

    @Column({unique : true})
    direccion : string

    @Column({unique : true})
    telefono : string;

    @Column()
    email : string;

    @CreateDateColumn({ type: 'timestamp'})
    fechaRegistro: Date;
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

/**@author Mario Astorga
 * @description tarea crear la entidad para los hoteles en NestJS usando TypeORM
 * 
*/

/**
 * @entity hoteles
 * @task creacion de la entidad para los hoteles en NestJS usando TypeORM siguiendo el ejmplo proporcionado.
 * incluyendo los siguientes campos:
 * 
 * CREATE TABLE hoteles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idhotelero int NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idhotelero) REFERENCES usuarios(id) ON DELETE CASCADE 
);
 * 
 * 
 * @param id - Identificador único del usuario.ç
 * @param idhotelero - Identificador del hotelero propietario del hotel.
 * @param nombre - Nombre completo del hotel.
 * @param direccion - Dirección del hotel.
 * @param telefono - Teléfono de contacto del hotel.
 * @param email - Correo electrónico del hotel.
 * @param fecha_registro - Fecha y hora en que el hotel se registró en el sistema.
 * @relation idhotelero - Relación con la entidad Usuario (hotelero) mediante clave foránea.
 */
