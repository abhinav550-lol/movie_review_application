import React, { useEffect } from 'react'
import Navbar from '../subcomponents/Navbar'

const Home = () => {
	useEffect(() => {
		document.title = 'CineCritic - Home'; 
		return () => {	document.title = 'CineCritic';}
	}, [])


  return (
	<div className='w-screen min-h-screen flex flex-col'> 
	  <Navbar />

	</div>
  )
}

export default Home
