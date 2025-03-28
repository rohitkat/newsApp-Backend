import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne} from 'typeorm'
import { PostCategory } from './PostCategory';
import { User } from './User';
import { PostListDetail } from './PostListDetail';

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id : Number = 0;

    @Column({type:'varchar', length:250})
    Title : string = "";

    @Column({type:'varchar', length:250})
    CaptionText : string = "";
    
    @Column({type :'text'})
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

    @OneToOne(() => PostListDetail, (postListDetail) => postListDetail.Post)
    PostListDetail! : PostListDetail 
}