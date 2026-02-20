//Routes which are only accessible to non logged in users ie signin register pages

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import LoadingPage from "./subcomponents/LoadingPage.jsx";

export default function NonUserRoute() {
	const {isAuthenticated , isAuthChecked} = useSelector((store) => store.auth);

	
	if(!isAuthChecked) return <LoadingPage />
	return !isAuthenticated ? <Outlet/> :  <Navigate to="/home"  />;
}