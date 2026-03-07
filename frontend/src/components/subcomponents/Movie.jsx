import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { addToFavorite, fetchMovieInfo, removeFromFavorite } from "../../api/moviesApi";
import { MoonLoader } from "react-spinners";

import ProtectedControls from "../subcomponents/ProtectedControls";
import { useSelector } from "react-redux";
import { showToast } from "../../utils/utils";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
const Movie = ({
  title,
  poster_url: posterUrl,
  vote_average: voteAverage,
  year,
  _id: movieId,
  parentRefetch,
  controls = true,
}) => {
  const { isAuthenticated, isAuthChecked , user } = useSelector((store) => store.auth);

  const {
    data: movieData,
    isError: isMovieError,
    isLoading: isMovieLoading,
    refetch: movieRefetch,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieInfo(movieId),
  });


  const navigate = useNavigate();
  function movieClick() {
    navigate(`/movies/${movieId}`);
  }

  async function addToFavoriteFn(){
	try{
		const res = await addToFavorite(movieId);
		showToast(res?.message || "Added to favorites!" , "success")
		movieRefetch();
		if(parentRefetch) parentRefetch();
	}catch(err){
		showToast(err.response?.data?.message || "Something went wrong" , "error")
	}
  }

  async function removeFromFavoriteFn(){
	try{
		const res = await removeFromFavorite(movieId);
		showToast(res?.message || "Removed from favorites!" , "success")
		movieRefetch();
		if(parentRefetch) parentRefetch();
	}catch(err){
		showToast(err.response?.data?.message || "Something went wrong" , "error")
	}
  }

  //Add onclick event later when movie info page is ready
  return (
    <div
      className="movie-box  min-w-[280px] h-90 rounded-lg overflow-hidden relative cursor-pointer flex"
      title={title}
    >
      {isMovieLoading ? (
        <MoonLoader
          className="scale-75 lg:scale-100 align-self-center mx-auto my-auto"
          size={40}
          speedMultiplier={0.5}
        />
      ) : isMovieError ? (
        <div className="text-red-500 text-center h-full">:/</div>
      ) : (
        <>
          <div className="absolute bg-black  w-full h-full opacity-20 z-10 "></div>
          <div
            className="movieClickDiv absolute  w-full h-full  z-11"
            onClick={movieClick}
          ></div>
          {controls && <ProtectedControls message="Please login to add to favorites!">
            {isAuthChecked && isAuthenticated && movieData?.movie?.favourited_by.includes(user?._id) ? 
				<div className="h-8 w-8 absolute right-0 m-2 bg-red-200 rounded-md opacity-50 text-3xl flex items-center justify-center  text-center md:text-3xl z-15 cursor-pointer" title="Remove from favorites" onClick={removeFromFavoriteFn}><CloseIcon /></div>
			: (
              <div
                className="h-8 w-8 absolute right-0 m-2 bg-emerald-200 rounded-md opacity-50 text-3xl flex items-center justify-center text-center md:text-3xl z-15 cursor-pointer"
                title="Add to favorites"
                onClick={addToFavoriteFn}
              >
                <AddIcon />
              </div>
            )}
          </ProtectedControls>}
          <div className="movie-small-info absolute z-10 p-2 w-full flex flex-col gap-2 bottom-0 text-white">
            <div className="flex flex-col">
              <div className="title font-bold text-xl">{title}</div>
              <span className="year font-medium">{year}</span>
            </div>
            <span
              className={
                "imdb-rating font-bold border-2 rounded-full  w-10 flex justify-center " +
                (voteAverage < 7 ? "bg-[#f6c73a]" : "bg-[#5cc960]")
              }
            >
              {voteAverage}
            </span>
          </div>

          <img
            src={posterUrl}
            alt={title}
			loading="lazy"
            className="w-full h-full object-cover  transition-transform duration-300 ease-out hover:scale-110"
          />
        </>
      )}
    </div>
  );
};

export default Movie;
