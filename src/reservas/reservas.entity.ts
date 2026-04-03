import { Habitacion } from 'src/habitaciones/habitaciones.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idusuario' })
  idUsuario: User;

  @ManyToOne(() => Habitacion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idhabitacion' })
  idHabitacion: Habitacion;

  @Column({ type: 'date', name: 'fecha_inicio', nullable: true })
  fechaInicio: Date | null;

  @Column({ type: 'date', name: 'fecha_fin', nullable: true })
  fechaFin: Date | null;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_registro' })
  fechaRegistro: Date;
}