import reviewController from '../controllers/reviewController.js';	
import { Router } from 'express';

import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = Router();

//Add review on a movie
router.post('/movies/:movieId/add', isLoggedIn , reviewController.addReview);

//Get all reviews for a particular movie
router.get('/movies/:movieId', reviewController.getReviewsByMovie);

//Get all reviews by a particular user, to be displayed on their profile
router.get('/users/:userId', isLoggedIn , reviewController.getAllUserReviews);

//edit a review by reviewId
router.patch('/:reviewId/edit', isLoggedIn , reviewController.editReview);

//delete a review by reviewId
router.delete('/:reviewId/delete', isLoggedIn , reviewController.deleteReview);
 
//upvote a review
router.post('/:reviewId/upvote', isLoggedIn , reviewController.upvoteReview);

//downvote a review
router.post('/:reviewId/downvote', isLoggedIn , reviewController.downvoteReview);

//Get reactions (upvotes and downvotes) for a review and the user reaction if logged in
router.get('/:reviewId/reactions', reviewController.getReviewReactions);

export default router;