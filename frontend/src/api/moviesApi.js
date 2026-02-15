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