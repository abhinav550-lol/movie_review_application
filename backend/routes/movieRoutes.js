import movieController from '../controllers/movieController.js';	
import { Router } from 'express';

import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = Router();

//Browsing movies on the home page and also able to add genres filter
router.get('/browse', movieController.browseMovies);

//Get movie details by movieId
router.get('/:movieId', isLoggedIn, movieController.getMovieDetails);

//Cards of movies on main page, this is paginated
router.get('/', movieController.viewAllMovies);

//Current user can add to favorites
router.post('/:movieId/favourites', isLoggedIn, movieController.addToFavourites);

//Current user can remove from favorites
router.delete('/:movieId/favourites', isLoggedIn, movieController.removeFromFavourites);

export default router;