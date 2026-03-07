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

