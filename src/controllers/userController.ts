import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/User";
import { comparePassword, hashPassword } from "../Authentication/PasswordSecure";
import { UserRole } from "../types/userRole";
import { generateToken } from "../Authentication/Authenticate";
import { AuthRequest } from "../types/AuthRequest";

class userController {
  constructor() {
  }

  public getUsers = async (req: AuthRequest, res: Response) => {
    try {
      const {userId} = req.user;
      console.log("user from request",userId);
      
      const userRepo = AppDataSource.getRepository(User);
      const users = await userRepo.find({ where: { isActive: true } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password, isActive } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const hashedPassword = await hashPassword(password);

      const newUser = userRepository.create({
        firstName :firstName,
        lastName :lastName,
        email :email,
        password:hashedPassword,
        role : UserRole.USER,
        isActive : isActive,
      });

      await userRepository.save(newUser);

      res
        .status(201)
        .json({ message: "User Created Successfully!", user: newUser });
    } catch (error) {
      console.log("Error Creating User!", error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };

  public  login = async(req : Request, res : Response) => {
    try{
      const{userName, password} = req.body;
      console.log('user name is - ',userName);
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where :{email:userName}
      });

      if(user){
        const isPasswordMatch = await comparePassword(password, user.password);
       
        if(isPasswordMatch){
          const token = await generateToken(String(user.id));

          res.status(200).json({message:"Token Generated Successfully!",Token : token});
        }
        else{
          res.status(401).json({message:"Un-Authorized!"});
        }
      }else{
        res.status(401).json({message:"Un-Authorized!"});
      }

    }catch(error){
      console.log("Error Login User!", error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  public updateUser = async (req: AuthRequest, res: Response) => {
    try {
      const { userId } = req.user;
      const { firstName, lastName, email, isActive } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({ id: Number(userId) });

      if (!user) {
        res.status(404).json({ message: "User Not found!" });
      } else {
        // Assign properties
        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.email = email ?? user.email;
        user.password = user.password;
        user.role = user.role;
        user.isActive = isActive ?? user.isActive;

        await userRepository.save(user);

        res.status(200).json({ message: "User Updated Successfully!", user });
      }
    } catch (error) {
      console.log("Error Updating User!", error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  public updatePassword = async(req : AuthRequest, res : Response) =>{
    try{
      const {userId} = req.user;
      const {password , newPassword} = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user  = await userRepository.findOne({where:{id: Number(userId) }});

      if(user){
        const isPasswordMatch = await comparePassword(password, user.password);

        if(isPasswordMatch){
          // Logic to update password 
          const hashedNewPassword = await hashPassword(newPassword)
          user.password = hashedNewPassword;
          await userRepository.save(user);

          res.status(200).json({message : "User Password updated successfully!", user : user});
        }else{
          // Password does not match
          res.status(500).json({message:"Password passed is not correct."});
        }
      }else{
        // User with ID passed does not match
        res.status(500).json({message:"User Not Found!"});
      }

    }catch(error){
      console.log("Error Updating User!", error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }   

}

export default new userController();
