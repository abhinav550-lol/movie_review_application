import React, { useEffect } from 'react'
import Navbar from '../subcomponents/Navbar'
import Hero from '../subcomponents/Hero';
import Trending from '../subcomponents/Trending';

const Home = () => {
	useEffect(() => {
		document.title = 'CineCritic - Home'; 
		return () => {	document.title = 'CineCritic';}
	}, [])


  return (
	<div className='w-full min-h-full h-full flex flex-col '> 
	  <Navbar />
	  <Hero/>
	  <Trending />
	</div>
  )
} 

export default Home;