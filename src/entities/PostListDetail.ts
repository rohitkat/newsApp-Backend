import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne} from 'typeorm'
import { Post } from './Post';
import { PostList } from './PostList';

@Entity()
export class PostListDetail{
    @PrimaryGeneratedColumn()
    id : Number = 0;

    @Column()
    DisplayOrder : Number = 0;

    @Column()
    Priority : Number = 0;

    @ManyToOne(() => PostList, postList => postList.postListDetail)
    PostList! : PostList;

    @ManyToOne(() => Post)
    Post! : Post;

    @Column()
    IsActive : Boolean = true;
}