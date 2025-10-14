import userController from '../controllers/userController.js';	
import { Router } from 'express';

import { isAuthenticated } from '../utils/isAuthenticated.js';

const router = Router();

//AuthRoutes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

//UserRoutes


export default router;