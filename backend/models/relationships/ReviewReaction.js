import mongoose from 'mongoose';

const reviewReactionSchema = new mongoose.Schema({
	review_id : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Review',
		required : [true, "Review ID is required"]
	},
	user_id: {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User',
		required : [true, "User ID is required"]
	},
	reaction_type : {
		type : String,
		enum : ['upvote', 'downvote'],
		required : [true, "Reaction type is required"]
	}
}, {_id : false});

reviewReactionSchema.index({ review_id: 1, user_id: 1 }, { unique: true });

export default mongoose.model("ReviewReaction", reviewReactionSchema);