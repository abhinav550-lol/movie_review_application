import axios from "axios";

export const fetchUserProfile = async (userId) => {
	const userProfileApi = import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}`;
	const res = await axios.get(userProfileApi);
	return res.data;
}

export const fetchFavMoviesByUserId = async (userId) => {
	const favMoviesByUserIdApi = import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}/favourites`;
	const res = await axios.get(favMoviesByUserIdApi);	
	return res.data;
}

export const fetchReviewsByUserId = async (userId) => {
	const reviewsByUserIdApi = import.meta.env.VITE_BACKEND_URL + `/api/reviews/users/${userId}`;
	const res = await axios.get(reviewsByUserIdApi , {
		withCredentials: true
	});	
	return res.data;
}

export const logoutUser = async () => {
	const logoutApi = import.meta.env.VITE_BACKEND_URL + `/api/users/logout`;
	const res = await axios.post(logoutApi, {} , {
		withCredentials: true
	});	

	console.log(res.data)
	return res.data;
}