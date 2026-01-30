//Routes which are only accessible to non logged in users ie signin register pages

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import LoadingPage from "./subcomponents/LoadingPage.jsx";

export default function NonUserRoute() {
	const {isAuthenticated , status} = useSelector((store) => store.auth);

	if(status === "loading") return <LoadingPage />
	return !isAuthenticated ? <Outlet/> :  <Navigate to="/home"  />;
}