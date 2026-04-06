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

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'monto_total' })
  montoTotal: number;

  @Column({ type: 'varchar', length: 10, default: 'usd' })
  moneda: string;

  @Column({ type: 'varchar', length: 50, name: 'estado_pago', default: 'pagado' })
  estadoPago: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'stripe_payment_intent_id',
    nullable: true,
  })
  stripePaymentIntentId: string | null;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_registro' })
  fechaRegistro: Date;
}