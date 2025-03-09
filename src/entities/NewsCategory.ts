import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm'

@Entity()
export class NewsCategory{

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
}