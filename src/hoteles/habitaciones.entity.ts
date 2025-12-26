import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "./hotel.entity";

@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.id, {
    cascade: true,
  })
  idhotel: number;

  @Column({ type: 'int' })
  numhabitacion: number;

  @Column({ type: 'enum', enum: ['individual', 'doble', 'suite'] })
  tipo: 'individual' | 'doble' | 'suite';

  @Column({ type: 'int' })
  capacidad: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({
    type: 'enum',
    enum: ['disponible', 'reservada', 'mantenimiento'],
    default: 'disponible',
  })
  estado: 'disponible' | 'reservada' | 'mantenimiento';

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'json', nullable: true })
  fotos: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;

  
}
