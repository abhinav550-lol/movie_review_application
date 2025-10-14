
import User from "../models/User.js";
import wrapAsyncErrors from '../error/wrapAsyncErrors.js'
import AppError from "../error/errorMiddleware.js";
import {setSession} from "../utils/session.js";

const userController = {};

//Authentication
userController.registerUser = wrapAsyncErrors(async (req, res, next) => {	
	const {username , email , password} = req.body;

	if(!username || !email || !password) {	
		return next(new AppError("Please provide all required fields", 400));
	}

	const existingUser = await User.findOne({$or: [{email}, {username}]});
	if(existingUser) {
		return next(new AppError("User with this email or username already exists", 400));
	}

	const newUser = await User.create({username , email , password});
	const token = newUser.generateToken();

	setSession(req, {token , userId : newUser._id.toString()});

	res.status(200).json({
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
	console.log(req.session.userId)
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

//User-based Logic

export default userController;