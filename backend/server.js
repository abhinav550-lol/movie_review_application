//Imports
import express from 'express'

import dotenv from 'dotenv'
dotenv.config();


const app = express();
//Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Routes





//Error middleware


app.listen(process.env.PORT , () => {
	console.log(`Server is running on port ${process.env.PORT}`);
})

