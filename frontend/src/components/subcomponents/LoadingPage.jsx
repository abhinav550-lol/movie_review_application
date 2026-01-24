import React from 'react'

const LoadingPage = () => {
  return (
	<div className='flex justify-center items-center w-screen h-screen bg-red-300'>
	  <img src="/assets/logo.png" alt="Loading..." className='w-1/6 animate-pulse'/>
	</div>
  )
}

export default LoadingPage
