
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import rateLimit from 'express-rate-limit';
import { AuthRequest } from '../types/AuthRequest'

 export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });
  };

  export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: "Too many requests, please try again later."
  });

 

  export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction):void => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid Token!" });
      return ;
    }
  };
