import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "./hotel.entity";

export enum TipoHabitacion {
  INDIVIDUAL = 'individual',
  DOBLE = 'doble',
  SUITE = 'suite',
}
export enum EstadoHabitacion {
  DISPONIBLE = 'disponible',
  RESERVADA = 'reservada',
  MANTENIMIENTO = 'mantenimiento',
}
@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.id, {
    cascade: true,
  })
  idhotel: Hotel;

  @Column({ type: 'int' })
  numhabitacion: number;

  @Column({ type: 'enum', enum: TipoHabitacion })
  tipo: TipoHabitacion;

  @Column({ type: 'int' })
  capacidad: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({
    type: 'enum',
    enum: EstadoHabitacion,
    default: 'disponible',
  })
  estado: EstadoHabitacion;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'json', nullable: true, default: null })
  fotos: string;

  @CreateDateColumn()
  fecha_registro: Date;
}
