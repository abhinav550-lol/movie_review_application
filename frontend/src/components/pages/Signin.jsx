import { useState } from 'react';
import Navbar from '../subcomponents/Navbar'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const Signin = () => {
	const navigate = useNavigate();
	const [formData , setFormData] = useState({
		email : '',
		password : ''
	});

	function handleChange(event){
	const {name , value} = event.target;

	setFormData((prevData) => ({
		...prevData,
		[name] : value
	}))
	}

	const loginMutation =  useMutation({
		mutationFn : loginUser,
		onSuccess : (data) => {	
			const {message , foundUser : user} = data;
			showToast(message , 'success');
			//Setting global auth state
			dispatch(setAuth(user._id))	
			navigate('/home');
		},

		onError : (error) => {
			showToast(error.response.data.message , 'error');
		}
	});

	async function handleSubmit(event){
		event.preventDefault();



	}

  return (
	<div className='w-screen min-h-screen flex flex-col'>
	  <Navbar authControls={false}/>
		<div className="flex-1 bg-[#cf384d] w-screen flex items-center justify-center">

	<form className="bg-white w-9/10 max-w-sm p-8 rounded-lg shadow-md font-karla">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 capitalize">
      Sign-In
    </h2>
    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-1" htmlFor="email">
        Email*
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
		name='email'
		onChange={handleChange}
		value={formData.email}
        required
		/>
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 text-sm mb-1" htmlFor="password">
        Password*
      </label>
      <input
        id="password"
        type="password"
        placeholder="••••••••"
		onChange={handleChange}
		name='password'
		value={formData.password}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
    </div>

	<div className="signup-redirect text-sm  md:text-base  my-2">Don't have an account? <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign Up</span></div>
    <button
      type="submit"
      className="w-full bg-[#cf384d] text-white py-2 rounded-md hover:bg-[#b32c3a] transition"
	  onClick={handleSubmit}
    >
      Sign In
    </button>
  </form>
</div>
	</div>
  )
}

export default Signin
