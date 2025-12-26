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
