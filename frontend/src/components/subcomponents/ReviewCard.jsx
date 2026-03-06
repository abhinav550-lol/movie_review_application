import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../api/userApi";
import Rating from "@mui/material/Rating";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { fetchMovieInfo } from "../../api/moviesApi";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({
  upvotes = 0,
  downvotes = 0,
  isEdited = false,
  movie_id: movieId,
  review_heading,
  review_rating,
  review_text,
  time,
  user_id: userId,
  _id: reviewId,

  // optional props for conditional styling / actions
  hasUpvoted = false,
  hasDownvoted = false,
  onUpvote,
  onDownvote,


  //
  showMovieInfo=false,
  redirectToMovie=false,
}) => {

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  }); 
  


  const username =
    userData?.user?.username ||
    userData?.username ||
    userData?.user?.name ||
    "unknown_user";

  const formattedTime = time
    ? new Date(Number(time)).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Unknown time";


const navigate = useNavigate();
  return (
    <div className={`w-full rounded-2xl border border-[#cf384d]/15 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${redirectToMovie && "cursor-pointer"}`}  onClick={() => redirectToMovie && navigate(`/movies/${movieId._id}`)}>
      <div className="p-5 sm:p-6">
        {/* Top section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-[#cf384d]">
                {isUserLoading
                  ? "@loading..."
                  : isUserError
                  ? "@unknown_user"
                  : `@${username}`}
              </p>

              {isEdited && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#cf384d]/10 px-2.5 py-1 text-xs font-medium text-[#cf384d]">
                  <EditOutlinedIcon sx={{ fontSize: 14 }} />
                  Edited
                </span>
              )}
            </div>

            <h3 className="wrap-break-word text-lg font-bold text-gray-900 sm:text-xl">
              {review_heading}
            </h3>

            <p className="mt-1 text-xs text-gray-500">{formattedTime}</p>
          </div>

          <div className="shrink-0">
            <Rating
              value={Number(review_rating) || 0}
              precision={0.5}
              readOnly
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#cf384d",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#f3b7bf",
                },
              }}
            />
          </div>
        </div>

        {/* Review text */}
		{showMovieInfo &&         
		<div className="mt-4">
          <p className="text-lg md:text-xl font-playfair leading-7 ">
            Movie: {movieId?.title}
          </p>
        </div>}
        <div className="mt-4">
          <p className="text-sm leading-7 text-gray-700 sm:text-base">
            {review_text}
          </p>
        </div>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-linear-to-r from-transparent via-[#cf384d]/20 to-transparent" />

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onUpvote?.(reviewId)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              hasUpvoted
                ? "border-[#cf384d] bg-[#cf384d] text-white shadow-sm"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-[#cf384d]/40 hover:text-[#cf384d]"
            }`}
          >
            <ThumbUpAltOutlinedIcon sx={{ fontSize: 18 }} />
            <span>{upvotes}</span>
          </button>

          <button
            type="button"
            onClick={() => onDownvote?.(reviewId)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              hasDownvoted
                ? "border-[#cf384d] bg-[#cf384d] text-white shadow-sm"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-[#cf384d]/40 hover:text-[#cf384d]"
            }`}
          >
            <ThumbDownAltOutlinedIcon sx={{ fontSize: 18 }} />
            <span>{downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard; 	