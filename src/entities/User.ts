import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from 'typeorm'
import { UserRole } from '../types/userRole';
import { IsEmail, Length } from 'class-validator';
import { Post } from './Post';


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id : number = 0;

    @Column()
    firstName : string = '';

    @Column()
    lastName : string = '';

    @IsEmail()
    @Column()
    email : string = '';

    @Length(6,20)
    @Column()
    password! : string;

    @Column({
        type:'enum',
        enum:UserRole,
        default: UserRole.USER
    })
    role!: UserRole;

    @Column()
    isActive : boolean = true;

    @OneToMany(() => Post, post => post.Author)
    posts! : Post[];
}