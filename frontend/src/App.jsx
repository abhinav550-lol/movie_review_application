import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

//React Redux / Stores
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./api/authApi.js";
import { setAuth, clearAuth } from './store/reducers/authSlice.js';

//Routes
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./components/pages/Home.jsx";
import Signin from "./components/pages/Signin.jsx";
import NonUserRoute from "./components/NonUserRoute.jsx";
import LoadingPage from "./components/subcomponents/LoadingPage.jsx";
import Signup from "./components/pages/Signup.jsx";


function App() {
	const dispatch = useDispatch();

	const { data, isLoading, error } = useQuery({
		queryKey: ["me"],
		queryFn: fetchMe,
		retry: false,
		onSuccess: (data) => {
			dispatch(setAuth(data.user));
		},
		onError: (err) => {
			console.log(err)
			dispatch(clearAuth());
		},
	});

	//Auth Checker UseEffect
	useEffect(() => {
		if (isLoading) return;

		if (error) {
			dispatch(clearAuth());
			return;
		}

		if (data && data.user) dispatch(setAuth(data.user));
	}, [data]);


	if (isLoading) return <LoadingPage />;


	//Dark Mode
	//useEffect(() => {
	//const theme = localStorage.getItem("darkMode");

	//if (theme === "yes") {
	//	document.documentElement.classList.add("dark");
	//} else {
	//	document.documentElement.classList.remove("dark");
	//	localStorage.setItem("darkMode", "no");
	//}
	//}, []);

	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes*/}
				<Route path='/' element={<Navigate to='/home' />} />
				<Route path="/home" element={<Home />} />

				{/* Public, but only accessible to non logged in users */}
				<Route element={<NonUserRoute />}>
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
				</Route>

				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>

				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
