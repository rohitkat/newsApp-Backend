import { DataSource } from 'typeorm'
import {User} from '../entities/User'

export const seedUsers = async(dataSource : DataSource) => {
    const userRepository = dataSource.getRepository(User);

    const existingUsers = await userRepository.count();
    if(existingUsers > 0){
        console.log("Users already exist, so no seeding required");
        return
    }

    const users = [
        {
            firstName : 'Guruji',
            lastName:'Shiv',
            email:'shiv.guruji@gmail.com',
            isActive:true
        },
        {
            firstName : 'Rohit',
            lastName:'Katoch',
            email:'katoch.rohit@gmail.com',
            isActive:true
        },
        {
            firstName : 'Anuradha',
            lastName:'Thakur',
            email:'athakur@gmail.com',
            isActive:true
        }
    ]

    await userRepository.save(users);
    console.log('User table seeded successfully!');
}