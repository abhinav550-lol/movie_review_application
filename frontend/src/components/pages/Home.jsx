import React, { useEffect } from 'react'
import Navbar from '../subcomponents/Navbar'
import Hero from '../subcomponents/Hero';

const Home = () => {
	useEffect(() => {
		document.title = 'CineCritic - Home'; 
		return () => {	document.title = 'CineCritic';}
	}, [])


  return (
	<div className='w-screen min-h-screen h-screen flex flex-col'> 
	  <Navbar />
	  <Hero/>
	</div>
  )
}

export default Home
