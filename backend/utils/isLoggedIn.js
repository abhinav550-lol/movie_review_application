import AppError from "../error/errorMiddleware.js";

export async function isLoggedIn(req, res, next) {	
	if (req.session && req.session.userId) {
		return next();
	}else{
		return next(new AppError("You are not authenticated", 401));
	}
}