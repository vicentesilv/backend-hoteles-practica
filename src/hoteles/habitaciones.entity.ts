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

/**@author vicente silva
 * @description tarea crear la entidad para las habitaciones en NestJS usando TypeORM
 * 
*/

/**
 * @entity habitaciones
 * @task creacion de la entidad para las habitaciones en NestJS usando TypeORM siguiendo el ejmplo proporcionado.
 * incluyendo los siguientes campos:
 * 
create table habitaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idhotel INT NOT NULL,
    numhabitacion VARCHAR(20) NOT NULL,
    tipo ENUM('individual', 'doble', 'suite') NOT NULL,
    capacidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    estado ENUM('disponible', 'reservada', 'mantenimiento') DEFAULT 'disponible',
    descripcion TEXT,
    fotos JSON,
    FOREIGN KEY (idhotel) REFERENCES hoteles(id) ON DELETE CASCADE
);
 * 
 * 
 * @param id - Identificador único del usuario.ç
 * @param idhotel - Identificador del hotel propietario de la habitación.
 * @param numhabitacion - Número de la habitación.
 * @param tipo - Tipo de habitación (individual, doble, suite).
 * @param capacidad - Capacidad máxima de la habitación.
 * @param precio - Precio por noche de la habitación.
 * @param estado - Estado actual de la habitación (disponible, reservada, mantenimiento).
 * @param descripcion - Descripción detallada de la habitación.
 * @param fotos - Fotos de la habitación en formato JSON.
 * @param fecha_registro - Fecha y hora en que la habitación se registró en el sistema.
 * @relation idhotel - Relación con la entidad Hotel mediante clave foránea.
 */
