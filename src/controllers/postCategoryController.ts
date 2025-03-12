import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { PostCategory } from "../entities/PostCategory";

class postCategoryController{
    constructor(){

    }

    public getCategoryMenu = async(req : Request, res: Response) =>{
        try{
            const postCategoryRepository = AppDataSource.getRepository(PostCategory);

            const postCategoryList = await postCategoryRepository.find();

            res.status(200).json({message:"Post Categories rendered Successfully!", menus:postCategoryList});
        }catch(error){
            res.status(500).json({ message: "Internal Server Error!" });
        }
    }
}

export default new postCategoryController();