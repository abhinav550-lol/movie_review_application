export default class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

function errorMiddleware(err, req, res, next) {
	const status = err.status || 500;
	const message = err.message || "Something went wrong";
	return res.status(status).json({
		success: false,
		message
	});
}

export { errorMiddleware };