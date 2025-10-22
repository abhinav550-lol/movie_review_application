import reviewController from '../controllers/reviewController.js';	
import { Router } from 'express';

import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = Router();

//router.post('/movies/:movieId/add', isLoggedIn , reviewController.addReview);

//router.get('/movies/:movieId', reviewController.getReviewsByMovie);

//router.patch('/:reviewId/edit', isLoggedIn , reviewController.editReview);

router.get('/users/:userId', isLoggedIn , reviewController.getAllUserReviews);

//router.delete('/:reviewId/delete', isLoggedIn , reviewController.deleteReview);

export default router;