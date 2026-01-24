import userController from '../controllers/userController.js';	
import { Router } from 'express';

import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = Router();

//AuthRoutes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', isLoggedIn ,userController.logoutUser);

//UserRoutes
//User profile display and also store this data in frontend as session
router.get('/:userId',userController.getUserProfile);

//Fav movies of current user to be displayed in the profile page
router.get('/:userId/favourites',userController.getFavAllMovies);

router.get('/user/me' , userController.getLoggedInUser);

export default router;