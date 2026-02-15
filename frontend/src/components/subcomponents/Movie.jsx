import React from 'react'

const Movie = ({ title, poster_url: posterUrl, vote_average: voteAverage, year }) => {

	//Add onclick event later when movie info page is ready
	return (
		<div className="movie-box  min-w-[280px] h-90 rounded-lg overflow-hidden relative cursor-pointer" title={title}>
			<div className="absolute bg-black  w-full h-full opacity-20 pointer-events-none z-1"></div>
			<div className="movie-small-info absolute z-10 p-2 w-full flex flex-col gap-2 bottom-0 text-white">
				<div className="flex flex-col">
					<div className="title font-bold text-xl">{title}</div>
					<span className="year font-medium">{year}</span>
				</div>
				<span className={"imdb-rating font-bold border-2 rounded-full  w-10 flex justify-center " + (voteAverage < 7 ? "bg-[#f6c73a]" : "bg-[#5cc960]")}>{voteAverage}</span>
			</div>

			<img src={posterUrl} alt={title} className="w-full h-full object-cover  transition-transform duration-300 ease-out hover:scale-110" />
		</div>
	)
}

export default Movie
