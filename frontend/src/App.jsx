import { BrowserRouter, Routes, Route  } from "react-router";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchMe } from "./store/reducers/authSlice.js";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMe());
	}, [dispatch])

  return (
	<BrowserRouter>
	  <Routes>	  
		{/* Public Routes*/}
		
		{/* Protected Routes */}
		<Route element={<ProtectedRoute />}>

		</Route>
	  </Routes>
	</BrowserRouter>
  )
}

export default App
