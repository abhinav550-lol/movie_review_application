import User from "../models/User";
import Movie from "../models/Movie.js";
import wrapAsyncErrors from '../error/wrapAsyncErrors.js'
import AppError from "../error/errorMiddleware.js";

const movieController = {};

//Getting a movie's details via id




//Adding movie to user's favourites
movieController.addToFavourites = wrapAsyncErrors(async (req, res, next) => {
	const userId = req.session.userId;

	const {movieId} = req.body;

	if(!movieId){
		return next(new AppError("Please provide all required fields", 400));
	}

	const foundMovie = await Movie.findById(movieId);

	if(!foundMovie){
		return next(new AppError("Movie not found", 404));
	}

	const user = await User.findById(userId);

	if(!user){
		return next(new AppError("User not found", 404));
	}

	user.favourites.push(foundMovie._id);
	await user.save();

	res.status(200).json({
		success: true,
		message: "Movie added to favourites",
		user
	});
})


export default movieController;