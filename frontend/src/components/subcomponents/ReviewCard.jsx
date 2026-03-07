import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../api/userApi";
import Rating from "@mui/material/Rating";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchMovieInfo } from "../../api/moviesApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import {  deleteReview, editReview , upvoteReview , downvoteReview , getUserReviewReaction} from "../../api/reviewsApi";
import { showToast } from "../../utils/utils";
import ProtectedControls from "./ProtectedControls";


const labelClass = "text-md text-xl lg:text-[22px] ";


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


	//
	showMovieInfo = false,
	redirectToMovie = false,
	updateDeleteButtons = true,
	disableVoting=false,

	parentRefetch,
}) => {
	const { isAuthenticated, isAuthChecked, user } = useSelector(
		(store) => store.auth,
	);

	const [editMode, setEditMode] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);

	const {
		data: userData,
		isLoading: isUserLoading,
		isError: isUserError,
	} = useQuery({
		queryKey: ["userProfile", userId],
		queryFn: () => fetchUserProfile(userId),
		enabled: !!userId,
	});
	
	//Getting review reactions
	const [reviewReaction , setReviewReaction] = useState(null);
	const {data : ReviewReactionData , isLoading : isReviewReactionLoading , isError : isReviewReactionError , refetch :userReviewReactionRefetch}= useQuery({
		queryKey : ["reviewReaction" , userId , upvotes , downvotes],
		queryFn : () => getUserReviewReaction(reviewId , setReviewReaction),
		enabled : !!isAuthenticated && !!userId,
	})


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

	
   //Edit form state
	const initialState = {
		review_heading,
		review_text,
		review_rating : review_rating.$numberDecimal || 0,
	}

	const [userEditedReview, setUserEditedReview] = useState(initialState);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const editedReview = await editReview(reviewId, userEditedReview);
			showToast(
				editedReview?.message || "Review added successfully",
				"success",
			);
			parentRefetch();
			setEditMode(false);
			setUserEditedReview(initialState);
		} catch (e) {
			showToast(e?.response?.data?.message || "Failed to add review", "error");
		}
	}

	function onInputChange(e) {
		const { name, value } = e.target;
		setUserEditedReview((prev) => ({ ...prev, [name]: value }));
	}

	async function deleteReviewFn(reviewId) {
		try {
			const deleteReviewRes = await deleteReview(reviewId);
			showToast(
				deleteReviewRes?.message || "Review deleted successfully",
				"success",
			);
			parentRefetch();
		} catch (error) {
			showToast(
				error?.response?.data?.message || "Failed to delete review",
				"error",
			);
		}
	}

	//Upvoting and Downvoting 
	async function handleUpvote(){
		if(disableVoting) return ;
		try{
			const upvoteReviewRes = await upvoteReview(reviewId);

			parentRefetch();
			userReviewReactionRefetch();
			showToast(
				upvoteReviewRes?.message || "Review upvoted successfully",
				"success"
			);

		}catch(e){
			showToast(
				e?.response?.data?.message || "Failed to upvote review",
				"error"
			);	
		}
	}

	async function handleDownvote(){
		if(disableVoting) return ;
		try{
			const downVoteRes = await downvoteReview(reviewId);
			parentRefetch();
			userReviewReactionRefetch();
			showToast(
				downVoteRes?.message || "Review downvoted successfully",
				"success"
			);
		}catch(e){
			showToast(
				e?.response?.data?.message || "Failed to downvote review",
				"error"
			)
		}
	}

	const navigate = useNavigate();
	return (
		<div className="w-full lg:max-w-3/5 self-center">
			<div
				className={`w-full rounded-2xl border border-[#cf384d]/15 bg-white shadow-sm transition-all duration-200  hover:shadow-md ${redirectToMovie && "cursor-pointer"}`}
				onClickCapture={() => redirectToMovie && navigate(`/movies/${movieId._id}`)}
			>
				<div className="p-5 sm:p-6">
					{/* Top section */}
					<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
						<div className="min-w-0 flex-1">
							<div className="mb-1 flex items-center gap-2 flex-wrap">
								<p className="text-md font-semibold text-[#cf384d]">
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

							<h3 className="wrap-break-word text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
								{review_heading}
							</h3>

							<p className="mt-1 text-xs text-gray-500">{formattedTime}</p>
						</div>
						<div className="shrink-0">
							<Rating
								value={review_rating.$numberDecimal || 0}
								precision={0.5}
								readOnly
								size="large"
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
					{showMovieInfo && (
						<div className="mt-4">
							<p className="text-lg md:text-xl font-playfair leading-7 ">
								Movie: {movieId?.title}
							</p>
						</div>
					)}
					<div className="mt-4">
						<p className="text-sm leading-7 text-gray-700 sm:text-base md:text-xl">
							{review_text}
						</p>
					</div>

					{/* Divider */}
					<div className="my-5 h-px w-full bg-linear-to-r from-transparent via-[#cf384d]/20 to-transparent" />

					{/* Actions */}
					<div className="flex flex-wrap items-center gap-3 w-full md:w-fit ">
					<ProtectedControls classes="cursor-pointer" message={"Please login to upvote!"}>
						<button
							type="button"
							onClick={() => handleUpvote?.(reviewId)}
							className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${reviewReaction && reviewReaction === "upvote"
								? "border-[#cf384d] bg-[#cf384d] text-white shadow-sm"
								: "border-gray-200 bg-gray-50 text-gray-600 hover:border-[#cf384d]/40 hover:text-[#cf384d]"
							}`}
						>
							<ThumbUpAltOutlinedIcon sx={{ fontSize: 18 }} />
							<span>{upvotes}</span>
						</button>
						</ProtectedControls>
							
						<ProtectedControls classes="cursor-pointer" message={"Please login to downvote!"}>
							<button
								type="button"
								onClick={() => handleDownvote?.(reviewId)}
								className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${reviewReaction && reviewReaction === "downvote"
										? "border-[#cf384d] bg-[#cf384d] text-white shadow-sm"
										: "border-gray-200 bg-gray-50 text-gray-600 hover:border-[#cf384d]/40 hover:text-[#cf384d]"
									}`}
							>
								<ThumbDownAltOutlinedIcon sx={{ fontSize: 18 }} />
								<span>{downvotes}</span>
							</button>
						</ProtectedControls>

						{updateDeleteButtons && isAuthenticated && user._id === userId && (
							<div className="flex items-center gap-5 ml-auto w-full  md:w-fit ">
								<div
									className="edit cursor-pointer"
									onClick={() => setEditMode((mode) => !mode)}
								>
									{editMode ? (
										<CloseIcon size="large" sx={{ fontSize: 30 }} />
									) : (
										<EditIcon size="large" sx={{ fontSize: 30 }} />
									)}
								</div>
								<div
									className="delete cursor-pointer relative flex "
									onClick={() => setDeleteDialog((dialog) => !dialog)}
								>
									<DeleteIcon size="large" sx={{ fontSize: 30 }} />
								</div>
								{deleteDialog && (
									<div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 md:text-lg">
										<div className="bg-white p-6 rounded-lg shadow-lg md:w-2/5 h-fit">
											<p className="text-sm md:text-xl text-gray-700 mb-4">
												Are you sure you want to delete this review?
											</p>
											<div className="flex justify-end gap-2">
												<button
													onClick={() => setDeleteDialog(false)}
													className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
												>
													Cancel
												</button>
												<button
													onClick={() => {
														deleteReviewFn(reviewId);
														setDeleteDialog(false);
													}}
													className="px-3 py-1 rounded-md bg-[#cf384d] text-white hover:bg-red-600 transition"
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			{isAuthenticated && user._id === userId && editMode && (
				<form
					onSubmit={handleSubmit}
					className=" mt-10 flex p-5  flex-col gap-4 border border-black/30 rounded-lg shadow-sm transition-all duration-200"
				>
					<div className="form-group flex flex-col ">
						<label htmlFor="review_heading" className={labelClass + " mb-2"}>
							Heading
						</label>
						<input
							type="text"
							id="review_heading"
							name="review_heading"
							value={userEditedReview["review_heading"]}
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
							value={userEditedReview["review_rating"]}
							precision={0.5}
							onChange={onInputChange}
							size="large"
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
					<div className="form-group flex flex-col gap-1">
						<label htmlFor="review_text" className={labelClass + " mb-2"}>
							Comment
						</label>
						<textarea
							name="review_text"
							id="review_text"
							value={userEditedReview["review_text"]}
							className="outline-2 md:w-1/2 rounded-sm md:max-w-[400px] lg:max-w-3/4 h-50 p-2"
							onChange={onInputChange}
						></textarea>
					</div>

					<button
						type="submit"
						className="font-karla bg-[#cf384d] text-white rounded-md hover:bg-[#f35f72] px-5 py-2 md:px-8 text-lg transition font-semibold w-fit cursor-pointer"
					>
						Edit Review
					</button>
				</form>
			)}
		</div>
	);
};

export default ReviewCard;
