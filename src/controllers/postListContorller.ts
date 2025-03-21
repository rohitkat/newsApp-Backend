import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { PostList } from "../entities/PostList";
import { stringify } from "querystring";

class postListController{
    constructor(){

    }

    public GetPostList = async(req : Request, res : Response) => {
        try{
            const {listName} = req.query??"";
            const postListRepository  = AppDataSource.getRepository(PostList);
    
            const postList = await postListRepository.find({
                where : {Title : listName?.toString()
                },
                relations: ['postListDetail', 'postListDetail.Post','postListDetail.Post.Category' ]
            });
    
            res.status(200).json({message : "Post List returned Successfull!", postList : postList});
        }catch(error){
            res.status(500).json({ message: "Internal Server Error!" });
        }
    }
}

export default new postListController();