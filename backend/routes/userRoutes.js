import userController from '../controllers/userController.js';	
import { Router } from 'express';

import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = Router();

//AuthRoutes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', isLoggedIn ,userController.logoutUser);
router.get('/me' ,  userController.getLoggedInUser);

//UserRoutes
//User profile display and also store this data in frontend as session
router.get('/:userId',userController.getUserProfile);

//Fav movies of current user to be displayed in the profile page
router.get('/:userId/favourites',userController.getFavAllMovies);


export default router;