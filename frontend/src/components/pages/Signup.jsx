import { useState } from 'react';
import Navbar from '../subcomponents/Navbar'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		username: ''
	});

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}))
	}

	function handleSubmit(event) {
		event.preventDefault();

		const api = import.meta.env.VITE_BACKEND_URL + '/api/users/login'
	}

	const [usernameInfoVisible, setUsernameInfoVisible] = useState(false);

	return (
		<div className='w-screen min-h-screen flex flex-col'>
			<Navbar authControls={false} />
			<div className="flex-1 bg-[#cf384c] w-screen flex items-center justify-center" >
				<form className="bg-white w-9/10 max-w-sm p-8 rounded-lg shadow-md font-karla">
					<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 capitalize">
						Sign-up
					</h2>


					<div className="mb-4">
						<label className="block text-gray-600 text-sm mb-1" htmlFor="username">
							Username* <span className="username-dialog hidden md:inline w-full relative" onMouseOver={() => setUsernameInfoVisible(true)} onMouseOut={() => setUsernameInfoVisible(false)}><img src="/assets/question-mark-circle.svg" className='w-4 inline-block' alt="Username requirements" />
								{usernameInfoVisible && (
									<div className="absolute bg-gray-400 border border-gray-300 rounded-md p-2 mt-1 w-72   text-sm text-white">Usernames can only contain A-Z, a-z,0-9, and underscore</div>
								)}
							</span>
						</label>
						<input
							id="username"
							type="text"
							placeholder="JohnDoe123"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
							name='username'
							onChange={handleChange}
							value={formData.username}
							required
						/>
						<span className='username-info md:hidden text-sm text-gray-600 inline-block px-1'>Usernames can only contain A-Z, a-z,0-9, and underscore</span>
					</div>

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

					<div className="signup-redirect text-sm  md:text-base  my-2">Already have an account? <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate('/signin')}>Sign In</span></div>
					<button
						type="submit"
						className="w-full bg-[#cf384d] text-white py-2 rounded-md hover:bg-[#b32c3a] transition"
						onClick={handleSubmit}
					>
						Sign Up
					</button>
				</form>
			</div>

		</div>
	)
}

export default Signup
