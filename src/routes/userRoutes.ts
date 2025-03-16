import { Router } from 'express'
import userController from '../controllers/userController';
import postCategoryController  from '../controllers/postCategoryController';
import { authenticateJWT } from '../Authentication/Authenticate';
import postController from '../controllers/postController';

const router = Router();

router.get('/users',authenticateJWT,userController.getUsers);
router.post("/users", userController.createUser);
router.patch('users/updatePassword',authenticateJWT, userController.updatePassword);
router.patch('/users/login', userController.login);
router.put("/users/update", authenticateJWT, userController.updateUser);

router.get('/menus/',postCategoryController.getCategoryMenu);

router.get('/posts', postController.getAllPosts);
router.post('/posts', authenticateJWT, postController.createPost);
router.put('/posts', authenticateJWT, postController.updatePost);


export default router;