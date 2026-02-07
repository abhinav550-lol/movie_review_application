import { useNavigate } from "react-router-dom"

const Logo = ({textSizeOpts="text-3xl md:text-4xl lg:text-5xl" , color="#cf384d"}) => {
  const navigate = useNavigate();
  return (
	  <span className={` cursor-pointer text-[${color}] ${textSizeOpts} font-playfair`} onClick={() => navigate('/home')}>CineCritic</span>
  )
}

export default Logo
