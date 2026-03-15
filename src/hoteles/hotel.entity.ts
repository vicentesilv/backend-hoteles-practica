import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>User, (user)=>user.id)
    idHotelero :  User;

    @Column()
    nombre : string;

    @Column({unique : true})
    direccion : string

    @Column({unique : true})
    telefono : string;

    @Column()
    email : string;

    @Column({ nullable: true })
    foto : string;

    @CreateDateColumn({ type: 'timestamp'})
    fechaRegistro: Date;
}
