import { useState } from "react";
import Rating from "@mui/material/Rating";
import ProtectedControls from "./ProtectedControls";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { addReview, fetchReviews } from "../../api/reviewsApi";
import { showToast } from "../../utils/utils";
import ReviewCard from "./ReviewCard";

const labelClass = "text-md text-xl lg:text-[22px] ";

const Review = ({ movieId }) => {
const {data : reviewsData , refetch : reviewsRefetch} = useQuery({
	queryKey : ["reviews", movieId],
	queryFn : () => fetchReviews(movieId)
  })

  const { isAuthenticated, isAuthChecked, user } = useSelector(
    (store) => store.auth,
  );

  const initialState = {
    "review_rating": 0,
    "review_heading": "",
    "review_text": "",
  };

  const [userReview, setUserReview] = useState(initialState);
  const [addReviewFormVisible, setAddReviewFormVisible] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

	try{
		const addReviewRes = await addReview(movieId , userReview);
		setUserReview(initialState);
		setAddReviewFormVisible(false);
		reviewsRefetch();		
		showToast(addReviewRes?.message || "Review added successfully" , "success")
	}catch(e){
		showToast(e?.response?.data?.message || "Failed to add review" , "error")
	}

  }

  function onInputChange(e) {
    const { name, value } = e.target;
    setUserReview((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="reviews  w-full p-5 mt-5 ">
      {/* Main Review Heading + Button */}
      <div className="review-main flex flex-col md:flex-row justify-between w-full">
        <h2 className="text-2xl md:text-3xl  mb-5 font-playfair tracking-wider">
          Reviews
        </h2>
        <div className="add-review flex flex-col gap-2 md:items-end ">
          <span className="text-xl text-gray-600 font-playfair">
            Watched this movie?
          </span>
          <ProtectedControls message="Please login to add a review!">
            <button
              className="font-karla bg-[#cf384d] text-white rounded-md hover:bg-[#f35f72] px-5 py-2 md:px-8 text-lg transition font-semibold w-fit cursor-pointer"
              onClick={() => {
                if (isAuthChecked && isAuthenticated) {
                  setAddReviewFormVisible((prev) => !prev);
                }
              }}
            >
              {addReviewFormVisible ? "Close" : "Add Review"}
            </button>
          </ProtectedControls>
        </div>
      </div>

      {/* Form visible on Click of Add */}
      {addReviewFormVisible && (
        <form
          onSubmit={handleSubmit}
          className=" mt-10 flex p-5  flex-col gap-4 "
        >
          <div className="form-group flex flex-col ">
            <label htmlFor="review_heading" className={labelClass + " mb-2"}>
              Heading
            </label>
            <input
              type="text"
              id="review_heading"
              name="review_heading"
              value={userReview["review_heading"]}
			  onChange={onInputChange}
              className="outline-2 md:w-1/2 md:max-w-[400px] rounded-sm h-10 p-2"
            />
          </div>
          <div className="form-group flex flex-col ">
            <label
              htmlFor="review_rating"
              className={labelClass}
              title="Enter review rating"
            >
              Rating
            </label>
            <Rating
              name="review_rating"
              id="review_rating"
              value={userReview["review_rating"]}
              precision={0.5}
			  onChange={onInputChange}
              size="large"
            />
          </div>
          <div className="form-group flex flex-col gap-1">
            <label htmlFor="review_text" className={labelClass + " mb-2"}>
              Comment
            </label>
            <textarea
              name="review_text"
              id="review_text"
              value={userReview["review_text"]}
              className="outline-2 md:w-1/2 rounded-sm md:max-w-[400px] lg:max-w-3/4 h-50 p-2"
              onChange={onInputChange}
            ></textarea>
          </div>

		  <button type="submit" className="font-karla bg-[#cf384d] text-white rounded-md hover:bg-[#f35f72] px-5 py-2 md:px-8 text-lg transition font-semibold w-fit cursor-pointer">
            Submit Review
          </button>
        </form>

)}
	<div className="reviews-list w-full h-fit mt-10  flex flex-col justify-center items-center md:items-start  p-2 gap-5">
		{reviewsData?.reviews?.length > 0 ? (
			<div className="flex flex-col gap-5">
				{reviewsData.reviews.map((review) => (
					<ReviewCard {...review} />
				))}
			</div>
		) : (
			<p className="text-gray-600 text-2xl text-wrap text-center w-full my-10">No reviews yet. Be the first to review this movie!</p>
		)}
	</div>
    </div>
  );
};

export default Review;
