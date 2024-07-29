import { ISession } from "connect-typeorm";
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from "typeorm";


@Entity()
export class Session implements ISession {

    
    @PrimaryColumn('varchar',{ length : 255 })
    id = '';

    @Index()
    @Column('bigint',{default:Date.now()})
    expiredAt : number;
     


    @Column('text')
    json = '';

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    destroyedAt?: Date;
}