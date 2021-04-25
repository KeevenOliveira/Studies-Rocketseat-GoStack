import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('appointments') // funciona como se fosse uma função 
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()//quando não passa nada no método é o método padrão, que é String
    provider_id: string;

    @ManyToOne( ()=> User)
    @JoinColumn({ name: 'provider_id'})
    provider: User;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('timestamp')
    date: Date;
}

export default Appointment;