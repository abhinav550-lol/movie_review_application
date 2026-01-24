import Review from "../models/Review.js";
import wrapAsyncErrors from "../error/wrapAsyncErrors.js";
import AppError from "../error/errorMiddleware.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import ReviewReaction from "../models/relationships/ReviewReaction.js";

const reviewController = {};

//Adding a review on a movie
reviewController.addReview = wrapAsyncErrors(async (req, res, next) => {
	const userId = req.session.userId;
	
	if(!userId){
		return next(new AppError("User not logged in", 401));
	}

	const foundUser = await User.findById(userId);
	if(!foundUser){
		return next(new AppError("User not found", 404));
	}

	const {movieId} = req.params;

	if(!movieId){
		return next(new AppError("Please provide all required fields", 400));
	}

	const foundMovie = await Movie.findById(movieId);
	if(!foundMovie){
		return next(new AppError("Movie not found", 404));
	}

	const {review_text , review_heading , review_rating} = req.body;

	if(!review_rating || !review_heading || !review_text) {
		let message = "Please provide ";

		if(!review_rating) message += "review rating, ";
		if(!review_heading) message += "review heading, ";
		if(!review_text) message += "review text, ";

		message = message.slice(0, -2); 

		return next(new AppError(message, 400));
	}

	const newReview = await Review.create({	review_rating , review_heading , review_text , user_id : foundUser._id , movie_id : foundMovie._id });

	return res.status(200).json({
		success : true,
		message : "Review added successfully",
		review : newReview
	})
})

//Editing a review on a movie
reviewController.editReview = wrapAsyncErrors(async (req, res, next) => {	
		const userId = req.session.userId;
	
	if(!userId){
		return next(new AppError("User not logged in", 401));
	}

	const foundUser = await User.findById(userId);
	if(!foundUser){
		return next(new AppError("User not found", 404));
	}

	const {reviewId} = req.params;
	if(!reviewId){
		return next(new AppError("Please provide review ID", 400));
	}

	const foundReview = await Review.findById(reviewId);
	if(!foundReview){
		return next(new AppError("Review not found", 404));
	}

	if(foundReview.user_id.toString() !== foundUser._id.toString()){
		return next(new AppError("You are not authorized to edit this review", 403));
	}

	const {review_text , review_heading , review_rating} = req.body;

	if(!review_rating || !review_heading || !review_text) {
		let message = "Please provide ";

		if(!review_rating) message += "review rating, ";
		if(!review_heading) message += "review heading, ";
		if(!review_text) message += "review text, ";

		message = message.slice(0, -2);

		return next(new AppError(message, 400));
	}

	foundReview.review_text = review_text;
	foundReview.review_heading = review_heading;
	foundReview.review_rating = review_rating;
	foundReview.isEdited = true;

	await foundReview.save();

	return res.status(200).json({
		success : true,
		message : "Review updated successfully",
		review : foundReview
	})
})

//Viewing all reviews on a movie
reviewController.getReviewsByMovie = wrapAsyncErrors(async (req, res, next) => {
	const {movieId} = req.params;

	if(!movieId){
		return next(new AppError("Please provide movie ID", 400));
	}

	const foundMovie = await Movie.findById(movieId);
	if(!foundMovie){
		return next(new AppError("Movie not found", 404));
	}

	const foundReviews = await Review.find({movie_id : movieId});

	return res.status(200).json({
		success : true,
		message : "Reviews fetched successfully",
		reviews : foundReviews,	
		total_count : foundReviews.length
	})
});


//Delete a review on a movie
reviewController.deleteReview = wrapAsyncErrors(async (req, res, next) => {
	const userId = req.session.userId;
	if(!userId){
		return next(new AppError("User not logged in", 401));
	}

	const foundUser = await User.findById(userId);

	if(!foundUser){
		return next(new AppError("User not found", 404));
	}

	const {reviewId} = req.params;
	if(!reviewId){
		return next(new AppError("Please provide review ID", 400));
	}

	const foundReview = await Review.findById(reviewId);
	if(!foundReview){
		return next(new AppError("Review not found", 404));
	}

	console.log(foundReview.user_id, foundUser._id);

	if(foundReview.user_id.toString() !== foundUser._id.toString()){
		return next(new AppError("You are not authorized to edit this review", 403));
	}

	await Review.findByIdAndDelete(reviewId);

	return res.status(200).json({
		success : true,
		message : "Review deleted successfully"
	})
})


//Get all user' reviews
reviewController.getAllUserReviews = wrapAsyncErrors(async (req, res, next) => {
	const userId = req.params.userId;
	if(!userId){
		return next(new AppError("User not logged in", 401));
	}

	const foundUser = await User.findById(userId);

	if(!foundUser){
		return next(new AppError("User not found", 404));
	}

	const allReviews = await Review.find({user_id : userId}).populate('movie_id' , 'title');

	return res.status(200).json({
		success : true,
		message : `Reviews of user ${foundUser.username} fetched successfully`,
		reviews : allReviews,	
		total_count : allReviews.length
	})
})

////Upvoting a review
reviewController.upvoteReview = wrapAsyncErrors(async (req, res, next) => {
	const userId = req.session.userId;

	if(!userId){
		return next(new AppError("User not logged in", 401));
	}

	const {reviewId} = req.params;

	if(!reviewId){
		return next(new AppError("Please provide review ID", 400));
	}

	const foundReview = await Review.findById(reviewId);
	if(!foundReview){
		return next(new AppError("Review not found", 404));
	}

	const foundUser = await User.findById(userId);

	if(!foundUser){
		return next(new AppError("User not found", 404));
	}

	let message = "";

	let foundReaction = await ReviewReaction.findOne({review_id : foundReview._id , user_id : foundUser._id});

	if(!foundReaction){
		foundReaction = await ReviewReaction.create({review_id : foundReview._id , user_id : foundUser._id , reaction_type : 'upvote'});
		foundReview.upvotes += 1;
		message = "Upvote added successfully";
	}else{
		if(foundReaction.reaction_type === 'upvote'){
			await ReviewReaction.deleteOne({review_id : foundReview._id , user_id : foundUser._id});
			foundReview.upvotes -= 1;
			message = "Upvote removed successfully";
		}else{
			foundReaction.reaction_type = 'upvote';
			foundReview.downvotes -= 1;
			foundReview.upvotes += 1;
			await foundReaction.save();
			message = "Upvote added successfully";
		}
	}

	await foundReview.save();

	return res.status(200).json({
		success : true,
		message,
		review : foundReview
	})
})



//Downvoting a review
reviewController.downvoteReview = wrapAsyncErrors(async (req, res, next) => {
	const userId = req.session.userId;

	if(!userId){
		return next(new AppError("User not logged in", 401));
	}

	const {reviewId} = req.params;

	if(!reviewId){
		return next(new AppError("Please provide review ID", 400));
	}

	const foundReview = await Review.findById(reviewId);
	if(!foundReview){
		return next(new AppError("Review not found", 404));
	}

	const foundUser = await User.findById(userId);

	if(!foundUser){
		return next(new AppError("User not found", 404));
	}

	let message = "";

	let foundReaction = await ReviewReaction.findOne({review_id : foundReview._id , user_id : foundUser._id});	

	if(!foundReaction){
		foundReaction = await ReviewReaction.create({review_id : foundReview._id , user_id : foundUser._id , reaction_type : 'downvote'});
		foundReview.downvotes += 1;
		message = "Downvote added successfully";
	}else{
		if(foundReaction.reaction_type === 'downvote'){
			await ReviewReaction.deleteOne({review_id : foundReview._id , user_id : foundUser._id});
			foundReview.downvotes -= 1;
			message = "Downvote removed successfully";
		}else{
			foundReaction.reaction_type = 'downvote';
			foundReview.downvotes += 1;
			foundReview.upvotes -= 1;
			await foundReaction.save();
			message = "Downvote added successfully";
		}
	}

	await foundReview.save();

	return res.status(200).json({
		success : true,
		message,
		review : foundReview
	})
})

//Fetching upvotes and downvotes
reviewController.getReviewReactions = wrapAsyncErrors(async (req, res, next) => {
  const { reviewId } = req.params;
  
  if (!reviewId) return next(new AppError("Please provide review ID", 400));
  
  const foundReview = await Review.findById(reviewId);
  if (!foundReview) return next(new AppError("Review not found", 404));

  const userReactionDoc = req.session.userId ? await ReviewReaction.findOne({ review_id: reviewId, user_id: req.session.userId }) : null;

  return res.status(200).json({
    success: true,
    upvotes: foundReview.upvotes,
    downvotes: foundReview.downvotes,
    user_reaction: userReactionDoc ? userReactionDoc.reaction_type : null
  });
});



export default reviewController;