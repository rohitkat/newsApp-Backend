import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany} from 'typeorm'
import { Post } from './Post';
import { PostListDetail } from './PostListDetail';

@Entity()
export class PostList{

    @PrimaryGeneratedColumn()
    id : Number =0;

    @Column()
    Title : string = "";

    @Column()
    Description : string = "";

    @Column()
    IsActive : boolean = true;

    @OneToMany(() => PostListDetail, postListDetail => postListDetail.PostList)
    postListDetail! : PostListDetail[];
}