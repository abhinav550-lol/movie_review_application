//Imports
import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cors from 'cors'

import userRoutes from './routes/userRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

const app = express();

//Configurations
app.use(
  session({
    secret: "your-secret-key",      // 🔐 used to sign the session ID cookie
    resave: false,                  // don't save session if unmodified
    saveUninitialized: false,       // don't create session until something stored
    cookie: {
      httpOnly: true,               // prevents client-side JS from reading the cookie
      secure: false,                // true in production with HTTPS
      maxAge: 1000 * 7 * 60 * 60 * 24,  // 7 days
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,              
    methods: ["GET", "POST", "PUT", "DELETE"], 
  }));
//Routes

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

//Error middleware
import {errorMiddleware} from './error/errorMiddleware.js'
app.use(errorMiddleware);

async function run() {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
		console.log("Connected to MongoDB");

		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});

	} catch (err) {
		console.log(err);
	}
}

run();
