import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({message="Error: Something went wrong!"}) => {
	const navigate = useNavigate();
	function navigateToHome(){
		navigate(-1);
	}
  return (
	  <div className="flex items-center  h-screen  flex-col">
		<Navbar />
		<div className="errorInfo w-screen flex-1 flex flex-col items-center justify-center gap-4 bg-red-100">
		<img src="/assets/c_crying_error.png" alt="Error"  className="w-[100px] lg:w-[200px]"/>
		<span className="text-xl lg:text-2xl font-bold text-red-600 text-wrap">{message}</span>
		<button onClick={navigateToHome} className="bg-red-600 text-white px-5 py-2 text-xl rounded-lg hover:bg-red-700 transition-colors">Back</button>
		</div>
	</div>
  )
}

export default ErrorPage
