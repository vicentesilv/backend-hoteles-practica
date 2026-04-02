import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from 'src/hoteles/hotel.entity';

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

  @ManyToOne(() => Hotel, (hotel) => hotel.id)
  @JoinColumn({ name: 'idhotel' })
  idHotel: Hotel;

  @Column({ type: 'int', name: 'numhabitacion' })
  numHabitacion: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;
}
