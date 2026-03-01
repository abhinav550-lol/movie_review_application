import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import { fetchMovieInfo } from '../../api/moviesApi';
import LoadingPage from '../subcomponents/LoadingPage';
import ErrorPage from '../subcomponents/ErrorPage';
import Navbar from '../subcomponents/Navbar';
import Footer from '../subcomponents/Footer';
import Separator from '../subcomponents/Separator';
import Snowfall from 'react-snowfall';

const genreStyles = "text-sm font-light md:text-xl  tracking-wide border-2 border-gray-600 rounded-full p-2  m-1 text-center";

const MovieInfo = () => {
	const { movieId } = useParams();
	const { data: movieData, isLoading: isMovieLoading, isError: isMovieError, error: MovieError } = useQuery({ queryKey: ['movieInfo', movieId], queryFn: () => fetchMovieInfo(movieId) });


	if (isMovieLoading) return <LoadingPage />
	if (isMovieError) return <ErrorPage message={"Error fetching movie details. Please try again later."} />

	return (
		<div className="flex items-center  min-h-screen flex-col">
			<Navbar />
			<div className="movieInfo flex-1 min-h-screen items-center flex flex-col md:flex-row  gap-5 p-5 flex-wrap relative">
					<Snowfall color='#ca3555' snowflakeCount={70} speed={[0.5, 1.5]} opacity={[0.2, 0.9]} />
				<div className="movie-img relative w-9/10 max-w-[300px] md:max-w-[350px]">
					<img src={movieData.movie.poster_url} alt={movieData.movie.title} className="movie-image  rounded-sm relative" />
					<span className={"imdb-rating absolute font-bold border-2 rounded-full  w-10 px-5 text-lg flex justify-center right-2 bottom-2 " + (movieData.movie.vote_average < 7 ? "bg-[#f6c73a]" : "bg-[#5cc960]")}>{movieData.movie.vote_average}</span>
				</div>
				<div className="text-info flex flex-col gap-4 items-center md:items-start md:min-w-full">
					<span className='year text-lg font-bold text-gray-600'>{movieData.movie.year}</span>
					<h1 className="text-2xl font-medium tracking-wider text-wrap text-center md:text-3xl">{movieData.movie.title}</h1>
					<div className="genres flex flex-wrap justify-center mb-10">
						<span className={genreStyles}>{movieData.movie.original_language}</span>
						{movieData.movie.genre.map((genre, index) =>
							<span key={index} className={genreStyles}>{genre}</span>
						)}
					</div >
					<h2 className="overview-heading md:flex hidden  md:text-3xl tracking-wide">Overview</h2>
					<div className="overview font-light text-xl text-center text-gray-600 md:text-2xl md:w-3/4 md:text-start">{movieData.movie.overview}</div>
				</div>
				<div className="stats flex flex-col md:gap-3 text-xl  justify-evenly md:items-start items-center md:justify-start md:text-2xl md:mt-10  gap-1 my-5 font-semibold text-gray-700 w-full ">
					<span className="vote-count">Votes: {movieData.movie.vote_count}</span>
					<span className="popularity">Popularity: {movieData.movie.popularity}</span>
					<span className="favoritedBy">Favorite of: {movieData.movie.favourited_by.length} users 
					</span>
				</div>
			</div>
			<Separator />
			<div className="reviews flex w-full p-5 mt-5">
				<h2 className="text-2xl md:text-3xl  mb-5 tracking-wide">Reviews</h2>
			</div>
			<Separator />
			<Footer />
		</div>
	)
}

export default MovieInfo


/*
Object Info

{
	"success": true,
	"message": "Movie details fetched successfully",
	"movie": {
		"_id": "68ee9bfa1f87801c8d64302e",
		"release_date": "2022-02-25T00:00:00.000Z",
		"year": 2022,	
		"title": "No Exit",
		"overview": "Stranded at a rest stop in the mountains during a blizzard, a recovering addict discovers a kidnapped child hidden in a car belonging to one of the people inside the building which sets her on a terrifying struggle to identify who among them is the kidnapper.",
		"popularity": 2500,
		"vote_count": 120,
		"vote_average": 6.3,
		"original_language": "EN",
		"genre": [
			"Thriller"
		],
		"poster_url": "https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg",
		"__v": 1,
		"favourited_by": []
	}
}
	
*/