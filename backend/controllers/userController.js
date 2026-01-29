
import User from "../models/User.js";
import wrapAsyncErrors from '../error/wrapAsyncErrors.js'
import AppError from "../error/errorMiddleware.js";
import {setSession} from "../utils/session.js";
import Movie from "../models/Movie.js"; 

const userController = {};

//Authentication
userController.registerUser = wrapAsyncErrors(async (req, res, next) => {	
	const {username , email , password} = req.body;
	
	if(!username || !email || !password) {	
		return next(new AppError("Please provide all required fields", 400));
	}
	
	const existingEmailUser = await User.findOne({email});
	if(existingEmailUser) {
		return next(new AppError("Email already in use", 400));
	}
	
	const existingNameUser = await User.findOne({username});
	if(existingNameUser) {
		return next(new AppError("Username already taken", 400));
	}

	const newUser = await User.create({username , email , password});
	const token = newUser.generateToken();

	setSession(req, {token , userId : newUser._id.toString()});

	return res.status(200).json({
		success: true,
		message : "User registered successfully",
		newUser
	})
})

userController.loginUser = wrapAsyncErrors(async (req, res, next) => {	
	const {email , password} = req.body;

	if( !email || !password) {	
		return next(new AppError("Please provide all required fields", 400));
	}

	const foundUser = await User.findOne({email});
	if(!foundUser) {
		return next(new AppError("Invalid email or password", 401));
	}

	const isMatch = await foundUser.comparePassword(password);
	if(!isMatch) {
		return next(new AppError("Invalid email or password", 401));
	}

	const token = foundUser.generateToken();

	req.session.userId = foundUser._id.toString();
	setSession(req, {token , userId : foundUser._id.toString()});

	res.status(200).json({
		success: true,
		message : "User logged-in successfully",
		foundUser
	})
})

userController.logoutUser = wrapAsyncErrors(async (req, res, next) => {	
	req.session.destroy((err) => {
		if(err) {
			return next(new AppError("Error logging out", 500));
		}

		res.status(200).json({
			success: true,
			message: "User logged out successfully"
		});
	});
});

/*----User Logic----*/

//Get user profile
userController.getUserProfile = wrapAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new AppError("Please provide all required fields", 400));
  }	

  
  const foundUser = await User.findById(userId).populate({
    path: 'favourite_movies',
    options: { limit: 5 }  
  });

  if (!foundUser) {
    return next(new AppError("User not found", 404));
  }

  const userData = foundUser.toObject();
  delete userData.password;

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: userData,
  });
});

userController.getFavAllMovies = wrapAsyncErrors(async (req, res, next) => {
	const {userId} = req.params;

	if(!userId){
		return next(new AppError("Please provide all required fields", 400));
	}

	const foundUser = await User.findById(userId);
	if(!foundUser){
		return next(new AppError("User not found", 404));
	}

	const {page = 1} = req.query;
	const limit = 5;

	const offset = (page - 1)*limit;

	const movies = await Movie.find({ _id: { $in: foundUser.favourite_movies } })
		.skip(offset)
		.limit(limit);
	const total_count = await Movie.countDocuments({ _id: { $in: foundUser.favourite_movies } });

	return res.status(200).json({
		success: true,
		message: "Favourite movies fetched successfully",
		movies,
		total_count
	});
});


userController.getLoggedInUser = wrapAsyncErrors(async (req , res , next) => {
	////Testing frontend code
	//return res.status(200).json({
	//	success : true,
	//	message : "User data found",
	//	isAuthenticated: true,
	//	user: {}
	//})
	////----------------------------
	console.log("hi from backend")

	const userId = req.session.userId;

	console.log(userId)
	if(!userId){
		return res.status(200).json({
			success : true,
			message: "No auth data found",
			isAuthenticated: false,
			user: null
		})
	}


	const foundUser = await User.findById(userId);
	if(!foundUser){
		return res.status(200).json({
			success : true,
			message: "User data not found",
			isAuthenticated: false,
			user: null
		})
	}

	return res.status(200).json({
		success : true,
		message : "User data found",
		isAuthenticated: true,
		user: foundUser
	})
})

export default userController;