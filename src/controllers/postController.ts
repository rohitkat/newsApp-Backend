import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { AuthRequest } from "../types/AuthRequest";
import { Post } from "../entities/Post";
import { IsNull, MoreThan, ILike } from "typeorm";
import { PostCategory } from "../entities/PostCategory";
import { User } from "../entities/User";

class postController {
  constructor() {}

  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const postRepo = AppDataSource.getRepository(Post);
      const posts = await postRepo.find({
        where: [
          { IsActive: true, ActiveTillDate: MoreThan(new Date()) },
          { IsActive: true, ActiveTillDate: IsNull() }, // To include posts without an expiry date
        ],
        order: {
          DisplayOrder: "ASC",
        },
      });
      res.status(200).json({ message: "", posts: posts });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!", error : error });
    }
  };

  public getPostById = async(req : Request, res : Response) => {
    try{
      const { postId } = req.body;
      const postRepo = AppDataSource.getRepository(Post);
      const post = await postRepo.findOne({
        where : { id : postId}
      });

      res.status(200).json({ message: "Post returned Successfully!", post: post });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!", error : error });
    }
  }

  public getPostsByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.body;
      const postRepo = AppDataSource.getRepository(Post);
      const posts = await postRepo.find({
        where: [
          {
            IsActive: true,
            ActiveTillDate: MoreThan(new Date()),
            Category: { Title: ILike(`%${category.toLowerCase()}%`)},
          },
          {
            IsActive: true,
            ActiveTillDate: IsNull(),
            Category: { Title: ILike(`%${category.toLowerCase()}%`)},
          }, // To include posts without an expiry date
        ],
        order: {
          DisplayOrder: "ASC",
        },
      });
      res.status(200).json({ message: "", posts: posts });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!", error : error });
    }
  };

  public createPost = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const {id,CaptionText, Description, Image, Thumbnail, Category, ActiveTillDate} = req.body;
        console.log(req.body);

        const categoryRepository = AppDataSource.getRepository(PostCategory);
        const postRepository = AppDataSource.getRepository(Post);
        const userRepository = AppDataSource.getRepository(User);
        const currentDate = new Date();

        const postCategory = await categoryRepository.findOne({where : {Title : Category}});
        const user = await userRepository.findOne({where :{id : userId}});

        console.log(postCategory, user);
        
        const newPost = postRepository.create({
          CaptionText : CaptionText,
          Description : Description,
          Image : Image,
          Thumbnail : Thumbnail,
          Category : postCategory ?? undefined,
          Author : user?? undefined,
          CreatedOn : currentDate,
          UpdatedOn : currentDate,
          ActiveTillDate : ActiveTillDate,
          IsActive : true
        });

        await postRepository.save(newPost);
        res.status(200).json({message: "Post Created Successfully!"});
        
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!", error : error });
    }
  }

  public updatePost = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const { id,  CaptionText, Description, Image, Thumbnail, Category, ActiveTillDate} = req.body;

        const categoryRepository = AppDataSource.getRepository(PostCategory);
        const postRepository = AppDataSource.getRepository(Post);
        const userRepository = AppDataSource.getRepository(User);
        const currentDate = new Date();

        const postCategory = await categoryRepository.findOne({where : {Title : Category}});
        const user = await userRepository.findOne({where :{id : userId}});
        const post = await postRepository.findOne({where : {id : id}});

        if(!post){
          res.status(404).json({message : "Post Not Found!"});
        }else{
          post.CaptionText = CaptionText ?? post.CaptionText,
          post.Description = Description ?? post.Description,
          post.Image =  Image ?? post.Image,
          post.Thumbnail = Thumbnail ?? post.Thumbnail,
          post.Category = postCategory ?? post.Category,
          post.Author = user?? post.Author,
          post.UpdatedOn = currentDate,
          post.ActiveTillDate = ActiveTillDate ?? post.ActiveTillDate,
          post.IsActive = true

          await postRepository.save(post);
          res.status(200).json({message : "Post Updated Successfull!"});
        }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" , error : error});
    }
  }
  
  public updateDisplayOrder = async(req : AuthRequest, res: Response) =>{
    try{
      const posts = req.body;
      const postRepository = AppDataSource.getRepository(Post);

      if (!Array.isArray(posts)) {
         res.status(400).json({ message: 'Invalid input format' });
      }

      for(const postOrder of posts) {
        // console.log("Post id - ", postOrder.id);
        // console.log("Display Order - ", postOrder.DisplayOrder);
        const post = await postRepository.findOne({where : {id : postOrder.id}});
        if(!post){
          res.status(404).json({message : "Post Id not found",id : postOrder.id});
        }else{
          post.DisplayOrder = postOrder.DisplayOrder;
          await postRepository.save(post);
        }
      }

      res.status(200).json({message : "Display Orders Updated Successfull!"});
    }catch(error){
      res.status(500).json({ message: "Internal Server Error!", error : error });
    }
  }
}

export default new postController();
