import axios from 'axios'

export async function fetchReviews(movieId) {
	const reviewsApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/movies/${movieId}`;
	const res = await axios.get(reviewsApi);
	return res.data;
}

export async function addReview(movieId, reviewData) {
	const addReviewApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/movies/${movieId}/add`;
	const res = await axios.post(addReviewApi, reviewData, { withCredentials: true });
	return res.data;
}

export async function deleteReview(reviewId) {
	const deleteReviewApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}/delete`;
	const res = await axios.delete(deleteReviewApi, { withCredentials: true });
	return res.data;
}

export async function editReview(reviewId , userEditedReview) {
	const deleteReviewApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}/edit`;
	const res = await axios.patch(deleteReviewApi, userEditedReview , { withCredentials: true });
	return res.data;
}

export async function upvoteReview(reviewId){
	const upvoteReviewApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}/upvote`;
	const res = await axios.post(upvoteReviewApi, {} , { withCredentials: true });
	return res.data;
}

export async function downvoteReview(reviewId){
	const downvoteReviewApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}/downvote`;
	const res = await axios.post(downvoteReviewApi , {} , { withCredentials: true });
	return res.data;
}

export async function getUserReviewReaction(reviewId , setReviewReaction){
	const getUserReactionApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}/reactions`;
	const res = await axios.get(getUserReactionApi , { withCredentials: true });
	setReviewReaction((e) => res.data?.user_reaction || null);
	return res.data;
}