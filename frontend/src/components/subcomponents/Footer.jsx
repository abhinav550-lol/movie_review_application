import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
<div className='w-full min-h-[30vh] py-4 px-5 flex flex-col md:flex-row gap-4 bg-[#cf384d] md:items-center  justify-center  md:justify-between'> 
		<div className="logo-content flex gap-2 flex-col  my-3 md:my-1 ">
			<Logo textSizeOpts='text-xl md:text-3xl' color='black'/>
			<p className="text-gray-200 font-medium md:text-xl">Discover new movies and reviews!</p>
		</div>

		<div className="connect w-1/4 flex flex-col gap-2 my-5 md:my-1 ">
			<h2 className='text-xl md:text-2xl font-medium text-black'>Connect</h2>
			<ul className="flex flex-col gap-4">
				<li><a className='text-gray-200 flex gap-2 font-karla cursor-pointer font-medium text-lg' target='_blank' href='https://github.com/abhinav550-lol/'><img src="assets/github-logo.svg"   alt="" className='w-6 ' /> <span>Github</span></a></li>
				<li><a className='text-gray-200 flex gap-2 font-karla cursor-pointer font-medium text-lg' target='_blank' href='https://www.linkedin.com/in/abhinav-mishra-53a504286/'><img src="assets/linkedin-logo.svg"   alt="" className='w-6   ' /> <span>LinkedIn</span></a></li>
			</ul>
		</div>
	</div>
  )
}

export default Footer
