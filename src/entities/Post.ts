import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm'
import { PostCategory } from './PostCategory';
import { User } from './User';

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id : Number = 0;

    @Column()
    CaptionText : string = "";
    
    @Column()
    Description : string = "";

    @Column()
    Image : string = "";
    
    @Column()
    Thumbnail : string = "";

    @ManyToOne(() => PostCategory, postCategory => postCategory.posts  )
    @JoinColumn()
    Category! : PostCategory;

    @Column()
    DisplayOrder : Number=0;

    @ManyToOne(() => User, user => user.posts)
    Author! : User;

    @Column()
    CreatedOn! : Date;

    @Column()
    UpdatedOn! : Date;

    @Column()
    ActiveTillDate! : Date;

    @Column()
    IsActive:boolean = true;
}