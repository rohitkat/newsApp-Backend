import AppDataSource  from '../data-source'
import { postCategorySeeder } from './postCategorySeeder';
import {seedUsers} from './userSeeder'

const seedDatabase = async() =>{
    try{
        console.log('Trying to initiate database');
        await AppDataSource.initialize();
        console.log('Database connected!');

        await seedUsers(AppDataSource);
        console.log("Database seeded with Users");

        await postCategorySeeder(AppDataSource);
        console.log("Database seeded with Post Categories");

        process.exit(0);

    }catch(error){
        console.log('Seeding Failed!', error);
        process.exit(1);
    }
}

seedDatabase();