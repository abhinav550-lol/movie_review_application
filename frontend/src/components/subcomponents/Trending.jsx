import React from 'react'
import Marquee from "react-fast-marquee";

const Trending = () => {
  return (
	//Temp h screen
	<div className='w-full min-h-screen py-4 px-2 flex flex-col gap-4'> 
	  <div className="intro-content flex flex-col gap-2 mb-10">
		<div className="title font-playfair text-2xl md:text-3xl font-medium ">Trending Now</div>
		<p className="text-sm md:text-xl text-gray-500 font-light ">The hottest movies and shows everyone is talking about.</p>
	  </div>

	  <Marquee className="trending-marquee" autoFill={true} speed={25} gradient={true} gradientColor='white' pauseOnHover={true} gradientWidth={100}>
		
	  </Marquee>
	</div>
  )
}

export default Trending
