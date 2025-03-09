import express,{Request,Response} from "express";
import userRoutes from './routes/userRoutes'
import AppDataSource from './data-source'
import dotenv from 'dotenv'

const app = express();
app.use(express.json());
app.use('/api/users',userRoutes);
dotenv.config();
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Node.js!");
  });
  
  const PORT = 5000;
  console.log('JWT-Secret = ', process.env.JWT_SECRET);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
