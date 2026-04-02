import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habitacion } from './habitaciones.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  idHotelero: User;

  @Column()
  nombre: string;

  @Column({ unique: true })
  direccion: string;

  @Column({ unique: true })
  telefono: string;

  @Column()
  email: string;

  @OneToMany(() => Habitacion, (Habitacion) => Habitacion.idHotel, {
    cascade: true,
  })
  habitaciones: Habitacion[];

  @Column({ nullable: true })
  foto: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaRegistro: Date;
}
