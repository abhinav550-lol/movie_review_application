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