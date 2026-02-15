import { useEffect, useRef } from 'react'

const heroMovieClasses = "movie-image hover:outline-offset-[-3px] hover:scale-105  transition-all duration-300 ease-in-out rounded-lg hover:opacity-80 hover:translate hover:-translate-y-5 ";

const Hero = () => {
	const inputRef = useRef(null);

	const placeholderTexts = [
		"🔍 Search for a movie you love.",
		"🍿 What are we watching tonight?",
		"🎬 Find reviews before you press play.",
		"⭐ Discover your next favorite movie.",
		"👀 See what everyone is talking about.",
		"🎥 Search movies, reviews, and opinion."

		
	];

	useEffect(() => {
		let index = 0;
		const placeholderInterval = setInterval(() => {
			inputRef.current.placeholder = placeholderTexts[index];
			index = (index + 1) % placeholderTexts.length;
		}, 3000);

		return () => clearInterval(placeholderInterval);
	})

	return (
		<>
			<div className="min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-6rem)] w-full bg-linear-to-r from-[#cf384d] to-[#af0000] flex  justify-center items-center text-white p-2  gap-4 relative">
				<img src="/assets/polka-dot-hero.svg" className="absolute inset-0 w-full h-full object-cover opacity-3 pointer-events-none"/>
				<div className="flex flex-col justify-center items-start w-4/5 md:w-1/2 gap-4 p-2 ">
					<div className="hero-content">
						<h1 className='text-md md:text-2xl lg:text-3xl font-bold tracking-wider whitespace-nowrap mb-4'>Find Your Next Favorite Movie.</h1>
						<p className='text-sm md:text-lg lg:text-xl '>Write reviews, read perspectives, and connect with a community that lives for cinema.</p>
					</div>
					<form action="" className='flex w-full  md:w-9/10 min-w-50 flex-none'>
						<input type="text" ref={inputRef} className='w-full h-12 bg-white outline-none text-sm lg:text-lg  text-black p-2 font-semibold ' placeholder='😮‍💨Browse your all-time classics!' />
						<button className='border bg-slate-800 cursor-pointer min-w-2/10 lg:min-w-1/10  flex justify-center items-center '><img src="/assets/double-right-arrow.svg" alt=">" className='rounded' /></button> {/* Replace with search icon and browsing functionality */}
					</form>
				</div>

				<div className="hero-movie-titles md:grid md:grid-cols-3 hidden max-w-1/3 h-7-10 gap-3">
					<div  className={heroMovieClasses + "outline-2 outline-black"}><img src="https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"   alt="" />  </div>
					<div  className={heroMovieClasses + "outline-2 outline-black"}><img src="https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"  alt="" />  </div>
					<div  className={heroMovieClasses + "outline-2 outline-black"}><img src="https://image.tmdb.org/t/p/original/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg"  alt="" />  </div>
				</div>

				<div className={"scroll scale-50"}></div>
			</div>	
		</>
	)
}

export default Hero
