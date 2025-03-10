import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from 'typeorm'
import { Post } from './Post';

@Entity()
export class PostCategory{

    @PrimaryGeneratedColumn()
    id: Number =0;

    @Column()
    Title : string = "";

    @Column()
    ParentCategoryId :Number = 0;

    @Column()
    IsCustomCategory : boolean = false;

    @Column()
    DisplayOrder : Number = 0;

    @Column()
    IsActive : boolean = false;

    @OneToMany(() => Post, post => post.Category)
    posts! : Post[];
}