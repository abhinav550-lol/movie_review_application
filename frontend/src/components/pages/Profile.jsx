import Navbar from '../subcomponents/Navbar.jsx';
import Footer from '../subcomponents/Footer.jsx';
import {useParams} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../../api/userApi.js';
import LoadingPage from '../subcomponents/LoadingPage.jsx';


const Profile = () => {
	
	const {userId} = useParams();
	const {data , isLoading , error} = useQuery({queryKey : ['userProfile' , userId] , queryFn : () => fetchUserProfile(userId)});

	if(isLoading) return <LoadingPage />

	console.log(data)
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar authControls={false}/>
			<div className="profileInfo  h-screen relative">
			{error ? <div className="text-red-500 text-center py-4 bold w-full min-h-full flex items-center justify-center"><span>{error?.response?.data?.message || "An error occurred while fetching user profile."}</span></div>: 
			<>
			
			</>
			}
			</div>
	<Footer />
		</div>
  )
}

export default Profile
 