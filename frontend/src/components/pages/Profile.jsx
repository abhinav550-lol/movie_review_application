import Navbar from '../subcomponents/Navbar.jsx';
import Footer from '../subcomponents/Footer.jsx';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFavMoviesByUserId, fetchReviewsByUserId, fetchUserProfile } from '../../api/userApi.js';
import LoadingPage from '../subcomponents/LoadingPage.jsx';
import Movie from '../subcomponents/Movie.jsx';
import { MoonLoader } from 'react-spinners';


const Profile = () => {
	const { userId } = useParams();
	const { data: userData, isLoading : isUserLoading, isError : isUserError } = useQuery({ queryKey: ['userProfile', userId], queryFn: () => fetchUserProfile(userId) });
	const { data: favMoviesData, isLoading : isFavMovieLoading,isError: isFavMovieError } = useQuery({ queryKey: ['userFavMovies', userId], queryFn: () => fetchFavMoviesByUserId(userId) });
	const { data: userReviewsData, isLoading : isUserReviewsLoading,isError: isUserReviewsError } = useQuery({ queryKey: ['userReviews', userId], queryFn: () => fetchReviewsByUserId(userId) });


	if (isUserLoading) return <LoadingPage />
	return (
<div className="min-h-screen flex flex-col">
  <Navbar authControls={false} />

  <div className="profileInfo w-full p-2 relative flex flex-col items-center mt-4 flex-1 min-h-screen">
    {isUserError ? (
      <div className="text-red-500 text-center py-4 font-bold w-full flex-1 min-h-0 flex items-center justify-center">
        <span>
          {isUserError?.response?.userData?.message ||
            "An error occurred while fetching user profile."}
        </span>
      </div>
    ) : (
      <>
        {/* header info */}
        <div className="profileInfoContent flex flex-col lg:flex-row items-center mb-6 gap-4">
		<div className="profileLogo w-25 h-25 rounded-full  bg-[#971297] flex justify-center items-center text-white border-4 border-gray-300">
			<div className="text-5xl capitalize">{userData?.user?.username[0]}</div>
		</div>
		<div className="flex flex-col items-center md:items-start gap-2 ">
		<div className="name text-center py-1 text-xl">
            @{userData?.user?.username}
          </div>
          <div className="name text-center py-1 text-md text-gray-400">
            {userData?.user?.email}
          </div>
		</div>
        </div>

        {/* main panels */}
        <div className="userActions  w-full lg:w-9/10 p-4 flex flex-col gap-5 flex-1 ">
          {/* FAVS */}
          <div className="fav-movies border border-gray-400 p-3 bg-gray-100 flex flex-col  min-h-80 overflow-auto rounded-lg">
            <div className="fav-movies-title font-medium text-md lg:text-2xl mb-4 font-playfair underline tracking-wider">
              {userData?.user?.username}'s favourites
            </div>

            <div className="movies flex flex-col flex-1 flex-wrap items-center justify-center gap-4  ">
              {!isFavMovieError && isFavMovieLoading ? (
                <MoonLoader
                  className="scale-75 lg:scale-100"
                  size={40}
                  speedMultiplier={0.5}
                />
              ) : favMoviesData?.movies?.length > 0 ? (
                favMoviesData.movies.map((movie) => (
                  <Movie key={movie.id} {...movie} />
                ))
              ) : (
                isFavMovieError ? (
                  <div className="text-red-500 flex justify-center items-center  w-full h-full py-4 flex-1">
                    Error loading favourite movies.
                  </div>
                ) : (
                  <div className="text-gray-500 flex justify-center items-center  w-full h-full py-4 flex-1 lg:text-xl">
                    No favourite movies found.
                  </div>
                )
              )}
            </div>
          </div>

          {/* REVIEWS */}
          <div className="fav-review border border-gray-400 p-3 bg-gray-100 min-h-80 overflow-auto rounded-lg flex flex-col">
            <div className="fav-movies-title font-medium text-md lg:text-2xl mb-4 font-playfair underline tracking-wider">
              {userData?.user?.username}'s reviews
            </div>
            <div className="reviews flex flex-col gap-4 flex-1 ">
              {
				!isUserReviewsError && isUserReviewsLoading ? (
				<MoonLoader
                  className="scale-75 lg:scale-100"
                  size={40}
                  speedMultiplier={0.5}
                />
				) : isUserReviewsError ? (
                  <div className="text-red-500 flex justify-center items-center  w-full h-full py-4 flex-1">
                    Error loading user reviews.
                  </div>
                ) : (
                  userReviewsData?.reviews?.length > 0 ? (
					  <>{/* Add loaded reviews  */} </>
				  ) : (
					<div className="text-gray-500 flex justify-center items-center  w-full h-full py-4 flex-1 lg:text-xl">
                      Users has no reviews.
                    </div>
				  )
					
                )}
            </div>
          </div>
        </div>
      </>
    )}
  </div>

  <Footer />
</div>
	)
}

export default Profile
