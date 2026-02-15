import React, { useState } from 'react'
import Snowfall from 'react-snowfall'
import { fetchMoviesByPage } from '../../api/moviesApi.js';
import { useQuery } from '@tanstack/react-query';
import { MoonLoader } from 'react-spinners';
import Movie from './Movie.jsx';

const pageControlBtnStyles = "page-btn bg-gray-800 text-white px-4 py-2 w-20 flex justify-center items-center rounded hover:bg-gray-700 transition-colors";

const MovieBrowsing = () => {
	const [pageIndex, setPageIndex] = useState(1);
	const { data, isLoading, error } = useQuery({ queryKey: ['moviesByPage', pageIndex], queryFn: () => fetchMoviesByPage(pageIndex), keepPreviousData: true });

	let lastPageIndex = 2
	if (data?.total_count) {
		lastPageIndex = Math.ceil(data.total_count / 20);
	}

	return (
		<>
			<div className='w-full  py-4 px-3 flex flex-col gap-4 relative'>
				<Snowfall color='#ca3555' snowflakeCount={50} speed={[0.5, 1.5]} opacity={[0.2, 0.9]} />
				<div className="intro-content flex flex-col gap-2 mb-3 mt-4">
					<div className="title font-playfair text-2xl md:text-3xl font-medium mb-1">Featured Movies</div>
					<p className="text-sm md:text-xl text-gray-500 font-light ">Browse through our collection of people’s all-time classics.</p>
				</div>

				<div className="movie-pagination flex-wrap gap-6 md:gap-8 lg:gap-10 flex justify-center items-center min-h-screen">
					{isLoading && !error ?
						<div className="w-full h-90 flex justify-center items-center">
							<MoonLoader
								className="scale-75 lg:scale-100"
								size={70}
								speedMultiplier={0.5}
							/>
						</div>
						:
						 data?.movies.map(movie => (
							<div key={movie.id}><Movie {...movie}/></div>
						))
					}

				{error && <div className="error flex flex-col justify-center items-center md:text-2xl">Failed to render movies. <div className='text-red-400 flex justify-center items-center'>{error?.message}</div></div>}
				</div>
				{!isLoading && !error &&
					<div className="page-control flex justify-center gap-2 mt-4">
						<button className={pageControlBtnStyles + (pageIndex === 1 ? " opacity-40 cursor-not-allowed" : "")} onClick={() => setPageIndex(prev => Math.max(1, prev - 1))} disabled={pageIndex === 1}>Previous</button>
						<span className="page-number font-medium text-2xl flex justify-center items-center border-2 border-gray-500 p-1 px-4 ">{pageIndex}</span>
						<button className={pageControlBtnStyles + (pageIndex === lastPageIndex ? " opacity-40 cursor-not-allowed" : "")} onClick={() => setPageIndex(prev => Math.min(lastPageIndex, prev + 1))}>Next</button>
					</div>
				}
			</div>
		</>
	)
}

export default MovieBrowsing
