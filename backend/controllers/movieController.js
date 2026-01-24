import User from "../models/User.js";
import Movie from "../models/Movie.js";
import wrapAsyncErrors from '../error/wrapAsyncErrors.js'
import AppError from "../error/errorMiddleware.js";

const movieController = {};

//Getting a movie's details via id
movieController.getMovieDetails = wrapAsyncErrors(async (req, res, next) => {
	const { movieId } = req.params;

	if (!movieId) {
		return next(new AppError("Please provide movie ID", 400));
	}

	const foundMovie = await Movie.findById(movieId);

	if (!foundMovie) {
		return next(new AppError("Movie not found", 404));
	}


	return res.status(200).json({
		success: true,
		message: "Movie details fetched successfully",
		movie: foundMovie
	})
})

//View all movies, (paginate this)
movieController.viewAllMovies = wrapAsyncErrors(async (req, res, next) => {
	const { page = 1 } = req.query;
	const limit = 20;

	const offset = (page - 1) * limit;

	const movies = await Movie.find().skip(offset).limit(limit);
	const total_count = await Movie.countDocuments();

	//Be sure to handle case where no movies are found in the frontend

	return res.status(200).json({
		success: true,
		message: "Movies fetched successfully",
		movies,
		total_count
	})
})


//Browse for movies, by name...... also adding filters, like genres
movieController.browseMovies = wrapAsyncErrors(async (req, res, next) => {
	const { name, genre } = req.query;
	const limit = 10;

	const filters = {};

	if (name) {
		filters.title = { $regex: name, $options: "i" };
	}

	if (genre) {
		filters.genre = { $in: [genre] };
	}

	if (!name && !genre) {
		return next(new AppError("Please provide name or genre to search.", 400));
	}

	const movies = await Movie.find(filters).limit(limit);

	return res.status(200).json({
		success: true,
		message: "Movies fetched successfully",
		movies,
		total_count: movies.length
	});
});


//Adding movie to user's favourites
movieController.addToFavourites = wrapAsyncErrors(async (req, res, next) => {
	const userId = req.session.userId;

	if (!userId) {
		return next(new AppError("User not logged in", 401));
	}

	const { movieId } = req.params;

	if (!movieId) {
		return next(new AppError("Please provide all required fields", 400));
	}

	const foundMovie = await Movie.findById(movieId);

	if (!foundMovie) {
		return next(new AppError("Movie not found", 404));
	}

	const user = await User.findById(userId);

	if (!user) {
		return next(new AppError("User not found", 404));
	}


	if (user.favourite_movies.includes(foundMovie._id)) {
		return next(new AppError("Movie already in favourites", 400));
	}

	user.favourite_movies.push(foundMovie._id);
	foundMovie.favourited_by.push(user._id);

	await Promise.all([user.save(), foundMovie.save()]);

	return res.status(200).json({
		success: true,
		message: "Movie added to favourites",
		user,
		movie : foundMovie
	});
})


movieController.removeFromFavourites = wrapAsyncErrors(async (req, res, next) => {
		const userId = req.session.userId;

	if (!userId) {
		return next(new AppError("User not logged in", 401));
	}

	const { movieId } = req.params;

	if (!movieId) {
		return next(new AppError("Please provide all required fields", 400));
	}

	const foundMovie = await Movie.findById(movieId);

	if (!foundMovie) {
		return next(new AppError("Movie not found", 404));
	}

	const user = await User.findById(userId);

	if (!user) {
		return next(new AppError("User not found", 404));
	}


	if (!user.favourite_movies.includes(foundMovie._id)) {
		return next(new AppError("Movie not in favourites", 400));
	}

	user.favourite_movies.pull(foundMovie._id);
	foundMovie.favourited_by.pull(user._id);

	await Promise.all([user.save(), foundMovie.save()]);

	return res.status(200).json({
		success: true,
		message: "Movie removed from favourites",
		user,
		movie : foundMovie
	});

});						


export default movieController;