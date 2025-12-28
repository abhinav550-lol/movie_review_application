import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    release_date: {
      type: Date,
      required: [true, "Release date is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1800, "Year cannot be before 1800"],
      max: [3000, "Year cannot be after 3000"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    overview: {
      type: String,
      trim: true,
    },
    popularity: {
      type: Number,
      default: 0,
      min: [0, "Popularity cannot be negative"],
    },
    vote_count: {
      type: Number,
      default: 0,
      min: [0, "Vote count cannot be negative"],
    },
    vote_average: {
      type: Number,
      min: [0, "Vote average must be at least 0"],
      max: [10, "Vote average cannot exceed 10"],
      default: 0,
    },
    original_language: {
      type: String,
      required: [true, "Original language is required"],
      uppercase: true,
      trim: true,
      minlength: [2, "Language code must be at least 2 characters"],
      maxlength: [5, "Language code cannot exceed 5 characters"],
    },
    genre: {
      type: [String], // 👈 changed to array of strings (better for filtering)
      required: [true, "Genre is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one genre must be specified",
      },
      trim: true,
    },
    poster_url: {
      type: String,
      required: [true, "Poster URL is required"],
      trim: true,
    },
	favourited_by : {
		type : [mongoose.Schema.Types.ObjectId],
		ref : "User",
		default : []
	}
  },
  {
    collection: "movies",
  }
);

const Movie =  mongoose.model("Movie", movieSchema);

export default Movie;
