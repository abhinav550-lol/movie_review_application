import userController from '../controllers/userController.js';	
import { Router } from 'express';

import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = Router();

//AuthRoutes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', isLoggedIn ,userController.logoutUser);

//UserRoutes
router.get('/:userId',userController.getUserProfile);

export default router;