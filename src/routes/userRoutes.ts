import { Router } from 'express'
import userController from '../controllers/userController';
import { authenticateJWT } from '../Authentication/Authenticate';

const router = Router();

router.get('/',authenticateJWT,userController.getUsers);
router.post("/", userController.createUser);
router.patch('/updatePassword',authenticateJWT, userController.updatePassword);
router.patch('/login', userController.login);
router.put("/update", authenticateJWT, userController.updateUser);

export default router;