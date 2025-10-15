import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true , 'Username already exists'],
  },
  email: {
    type: String,
    required: [	true , 'User email is a required'],
    unique: [true , 'Email already exists'],
  },
  password: {
    type: String,
    required: [true , 'User password is a required'],
    minlength: [6 , 'Password cannot be less than 6 characters'],
  },
  favourite_movies : {
	type : [mongoose.Schema.Types.ObjectId],
	ref : 'Movie',
	default : []
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = new mongoose.model("User", userSchema);
export default User;
