import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type:'bigint',
        name:'_id'
    })
    _id : number;

    @Column({
        nullable:false,
        default:''
    })
    username : string;

    @Column({
        nullable:false,
        default:''
    })
    email:string;

    @Column({
        nullable:false,
        default:''
    })
    password:string;

    


}