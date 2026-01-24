//reviewId reviewText userId movieId upvotes downvotes

import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
	review_rating : {
		type : Number,
		required : [true, "Review rating is required"],
		min : [1, "Minimum rating is 1"],
		max : [5, "Maximum rating is 5"]
	},
	review_heading:{
		type : String,
		required : [true, "Review heading is required"],
		trim : true,
		minlength : [3, "Review heading must be at least 3 characters"],
		maxlength : [50 , "Review heading cannot exceed 50 characters"]
	},
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
		type : Number,
		default : 0
	},
	downvotes : {
		type : Number,
		default : 0
	},
	isEdited : {
		type : Boolean,
		default : false
	},
	time : {
		type : Number,
		default : Date.now
	}
})

export default mongoose.model("Review", reviewSchema);