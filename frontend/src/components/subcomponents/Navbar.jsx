import  { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const hamburgerMenuStyle = 'border border-gray-500 w-full h-1/3 flex items-center justify-center cursor-pointer hover:bg-gray-300';
const bigScreenOptions = 'options hover:underline text-xl cursor-pointer flex items-center';

const Navbar = ({authControls = true}) => {
	const {isAuthenticated : isLoggedIn } = useSelector((store) => store.auth);

	const [menuOpen , setMenuOpen] = useState(false);
	
	const navigate = useNavigate();	
  return (
	<nav className='w-full h-24 flex items-center p-4 justify-between'>
		<Logo color='#cf384d'/>
		{/* Hamburger for phone layout -> Contains DarkMode SearchLink to browsing and Profile*/}
		{authControls &&  (isLoggedIn ? (
			<>
			<div className="hamburger md:hidden font-playfair  w-1/3 flex justify-end">
			<img src="/assets/hamburger-menu.svg" alt="hamburger" className='w-1/3 max-w-1/4 cursor-pointer relative ' onClick={() => setMenuOpen((isOpen) => !isOpen)}/>
			{menuOpen && (
				<ul className="open-menu absolute bg-[#9e9d9db1]  h-40 w-1/3 max-w-36 min-w-25 top-10 right-2 translate-y-8 flex flex-col items-center justify-around border rounded ">
					<li className={hamburgerMenuStyle}  onClick={() => {setMenuOpen((isOpen) => !isOpen); navigate('/profile') }}>Profile</li>
					<li className={hamburgerMenuStyle} onClick={() => {setMenuOpen((isOpen) => !isOpen); navigate('/browse')}}>Search</li>
					<li className={hamburgerMenuStyle} onClick={() => {setMenuOpen((isOpen) => !isOpen) }}><img src="/assets/dark-mode-icon.svg" alt="Dark Mode" /></li>
				</ul>
			)}
		</div>
		{/* Full Menu for larger screens -> Contains DarkMode SearchLink to browsing and Profile*/}
		<div className="bigscreen-options hidden md:flex w-1/3 font-playfair">
			<ul className="options flex justify-around w-full ">
				<li className={bigScreenOptions} onClick={() => {navigate('/profile')}}>Profile</li>
				<li className={bigScreenOptions} onClick={() => {navigate('/browse')}}>Search</li>
				<li className={bigScreenOptions }><img src="/assets/dark-mode-icon.svg" className='bg-gray-200 w-full h-full rounded-full' alt="Dark Mode" /></li>
			</ul>
		</div>
		</>
		) : ((
			<div className='flex justify-center items-center'>
			<button className="signIn rounded px-4 md:px-7 py-3 text-white  bg-[#cf384d]" onClick={() => navigate('/signin')}>SIGN IN</button>
			</div>
		)))}
		
	</nav>
  )
}

export default Navbar
