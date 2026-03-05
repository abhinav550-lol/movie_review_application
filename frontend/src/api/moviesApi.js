import axios from "axios";


export const fetchTrendingMovies = async () => {
	const trendingApi = import.meta.env.VITE_BACKEND_URL + '/api/movies/trending';
	const res = await axios.get(trendingApi);
	return res.data;
}

export const fetchMoviesByPage = async (pageIndex) => {
	const moviesByPageApi = import.meta.env.VITE_BACKEND_URL + `/api/movies?page=${pageIndex}`;
	const res = await axios.get(moviesByPageApi);
	return res.data;
}

export const fetchMovieInfo = async (movieId) => {
	const movieInfoApi = import.meta.env.VITE_BACKEND_URL + `/api/movies/${movieId}`;
	const res = await axios.get(movieInfoApi);
	return res.data;
}

export const fetchMoviesBySearch = async (q, genre) => {
	const searchApi = import.meta.env.VITE_BACKEND_URL + `/api/movies/browse?q=${q}&genre=${genre.join(",")}`;
	const res = await axios.get(searchApi);
	return res.data;
}

export const addToFavorite = async(movieId) => {
	const addToFavApi = import.meta.env.VITE_BACKEND_URL + `/api/movies/${movieId}/favorites`;
	const res = await axios.post(addToFavApi, {}, { withCredentials: true });
	return res.data;
}

export const removeFromFavorite = async(movieId) => {
	const addToFavApi = import.meta.env.VITE_BACKEND_URL + `/api/movies/${movieId}/favorites`;
	const res = await axios.delete(addToFavApi, { withCredentials: true });
	return res.data;
}