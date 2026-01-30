import { useEffect, useRef } from 'react'

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
		}, 2000);

		return () => clearInterval(placeholderInterval);
	})

	return (
		<div className="h-7/10 w-full bg-linear-to-r from-[#cf384d] to-[#af0000] flex justify-center items-center text-white ">
			<div className="flex flex-col justify-center items-start w-4/5 gap-2  p-2 ">
				<div className="hero-content">
					<h1 className='text-md md:text-2xl lg:text-3xl font-bold tracking-wider whitespace-nowrap'>Find Your Next Favorite Movie.</h1>
					<p className='text-sm md:text-lg lg:text-xl '>Write reviews, read perspectives, and connect with a community that lives for cinema.</p>
				</div>
				<form action="" className='flex w-1/2'>
					<input type="text" ref={inputRef}  className='md:w-full min-w-55 h-12 bg-white outline-none text-sm md:text-lg  text-black p-2 font-semibold ' placeholder='😮‍💨Browse your all-time classics!' />
					<button className='border bg-slate-800 cursor-pointer  min-w-10 flex justify-center items-center '><img src="/assets/double-right-arrow.svg" alt=">" className='rounded' /></button> {/* Replace with search icon and browsing functionality */}
				</form>
			</div>
		</div>
	)
}

export default Hero
