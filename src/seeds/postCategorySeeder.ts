import { DataSource } from "typeorm";
import { PostCategory } from "../entities/PostCategory";

export const postCategorySeeder = async(dataSource : DataSource) => {
    const postCategoryRepository = dataSource.getRepository(PostCategory);

    const existingCategories = await postCategoryRepository.count();
    if(existingCategories > 0){
        console.log("Post Categories already exist, so no seeding required");
        return
    }

    const postCategories = [
        {
            Title: "HOME",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 1,
            IsActive: true
        },
        {
            Title: "INDIA",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 2,
            IsActive: true
        },
        {
            Title: "CITIES",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 3,
            IsActive: true
        },
        {
            Title: "OPINION",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 4,
            IsActive: true
        },
        {
            Title: "WORLD",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 5,
            IsActive: true
        },
        {
            Title: "SPORTS",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 6,
            IsActive: true
        },
        {
            Title: "ENTERTAINMENT",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 7,
            IsActive: true
        },
        {
            Title: "AUTO",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 8,
            IsActive: true
        },
        {
            Title: "TECH",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 9,
            IsActive: true
        },
        {
            Title: "TRENDING",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 10,
            IsActive: true
        },
        {
            Title: "BUSINESS",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 11,
            IsActive: true
        },
        {
            Title: "MORE",
            ParentCategoryId : 0,
            IsCustomCategory : false,
            DisplayOrder : 12,
            IsActive: true
        },
        {
            Title: "DELHI",
            ParentCategoryId : 3,
            IsCustomCategory : false,
            DisplayOrder : 1,
            IsActive: true
        },
        {
            Title: "MUMBAI",
            ParentCategoryId : 3,
            IsCustomCategory : false,
            DisplayOrder : 2,
            IsActive: true
        },
        {
            Title: "Kolkata",
            ParentCategoryId : 3,
            IsCustomCategory : false,
            DisplayOrder : 3,
            IsActive: true
        },
        {
            Title: "Chenai",
            ParentCategoryId : 3,
            IsCustomCategory : false,
            DisplayOrder : 4,
            IsActive: true
        },
        {
            Title: "CRICKET",
            ParentCategoryId :6,
            IsCustomCategory : false,
            DisplayOrder : 1,
            IsActive: true
        },
        {
            Title: "HOCKEY",
            ParentCategoryId : 6,
            IsCustomCategory : false,
            DisplayOrder : 22,
            IsActive: true
        }
    ]

    await postCategoryRepository.save(postCategories);
    console.log('PostCategory table seeded successfully!');
}
