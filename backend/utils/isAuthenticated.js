export async function isAuthenticated(req, res, next) {	
	if (req.session && req.session.userId) {
		next();
	}

	return next(new AppError("You are not authenticated", 401));
}