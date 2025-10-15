//reviewId reviewText userId movieId upvotes downvotes

import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
	review_text : {
		type: String,
		required: [true, "Review text is required"],
		trim: true,
		minlength: [10, "Review must be at least 10 characters"],
		maxlength: [2000 , "Review cannot exceed 2000 characters"]
	},
	user_id : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User',
		required : [true, "User ID is required"]
	},
	movie_id : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Movie',
		required : [true, "Movie ID is required"]
	},
	upvotes : {
		type : [mongoose.Schema.Types.ObjectId],
		ref : 'User',
		default : []
	},
	downvotes : {
		type : [mongoose.Schema.Types.ObjectId],
		ref : 'User',
		default : []
	},
	time : {
		type : Number,
		default : Date.now
	}
})

export default mongoose.model("Review", reviewSchema);