import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') // funciona como se fosse uma função 
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()//quando não passa nada no método é o método padrão, que é String
    name: string;
    
    @Column()
    email:string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;