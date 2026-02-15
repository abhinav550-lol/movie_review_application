import { useNavigate } from "react-router-dom"

const Logo = ({textSizeOpts="text-3xl md:text-4xl lg:text-5xl" , color="#cf384d"}) => {
  const navigate = useNavigate();
  return (
	  <span className={` cursor-pointer  font-playfair ${textSizeOpts} `} style={{color}} onClick={() => navigate('/home')}>CineCritic</span>
  )
}

export default Logo
