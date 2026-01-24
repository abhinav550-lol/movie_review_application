import { BrowserRouter, Routes, Route, NavLink, Navigate  } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchMe } from "./store/reducers/authSlice.js";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./components/pages/Home.jsx";
import Signin from "./components/pages/Signin.jsx";
import NonUserRoute from "./components/NonUserRoute.jsx";

function App() {
	const dispatch = useDispatch();

	//Intial Profile Fetch
	useEffect(() => {
		dispatch(fetchMe());
	}, [dispatch])

	//Dark Mode
	useEffect(() => {
	const theme = localStorage.getItem("darkMode");

	if (theme === "yes") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
		localStorage.setItem("darkMode", "no");
	}
	}, []);

	return (
		<BrowserRouter>
	  <Routes>	  
		{/* Public Routes*/}
		 <Route path='/' element={<Navigate to='/home'/>}/>
		<Route path="/home" element={<Home />}/>

		{/* Public, but only accessible to non logged in users */}
		<Route element={<NonUserRoute />}>
		  <Route path="/signin" element={<Signin />}/>
		</Route>
		
		{/* Protected Routes */}
		<Route element={<ProtectedRoute />}>

		</Route>
	  </Routes>
	</BrowserRouter>
  )
}

export default App
