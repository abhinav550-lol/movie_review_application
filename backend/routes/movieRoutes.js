import movieController from '../controllers/movieController.js';	
import { Router } from 'express';

import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = Router();

router.get('/browse', movieController.browseMovies);

router.get('/:movieId', isLoggedIn, movieController.getMovieDetails);

router.get('/', movieController.viewAllMovies);

router.post('/:movieId/add-to-favourites', isLoggedIn, movieController.addToFavourites);

export default router;