import { useQuery } from '@tanstack/react-query';
import Marquee from "react-fast-marquee";
import { fetchTrendingMovies } from '../../api/moviesApi';
import { MoonLoader } from 'react-spinners';
import Movie from './Movie';

const Trending = () => {
	const {data , isLoading , error} = useQuery({queryKey : ['trendingMovies'] , queryFn : fetchTrendingMovies});

	return (
<div className='w-full min-h-[65vh] py-4 px-3 flex flex-col gap-4 '>  
	  <div className="intro-content flex flex-col gap-2 mb-3 mt-4">
		<div className="title font-playfair text-2xl md:text-3xl font-medium mb-1">Trending Now</div>
		<p className="text-sm md:text-xl text-gray-500 font-light ">The hottest movies and shows everyone is talking about.</p>
	  </div>
	{isLoading & !error ? 
		<div className="w-full h-90 flex justify-center items-center">
		<MoonLoader
			className="scale-75 lg:scale-100"
			size={40}
			speedMultiplier={0.5}
		/>
		</div>
	:
		<Marquee className="trending-marquee"  autoFill={true} speed={30} gradient={true} gradientColor='white'  gradientWidth={20}>
			{
				data?.movies.map((movie) => {
					return <div className="mx-2 lg:mx-4 "  key={movie.id}><Movie {...movie}/></div>
				})
			}
		</Marquee>
		
	}

	{
		error &&
		<div className="w-full h-24 flex justify-center items-center error  md:text-2xl">
			Failed to load trending movies. Please try again later.
		</div>
	}


	</div>
  )
}

export default Trending
