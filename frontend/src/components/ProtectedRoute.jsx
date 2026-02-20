import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import LoadingPage from "./subcomponents/LoadingPage.jsx";

export default function ProtectedRoute() {
	const {isAuthenticated , isAuthChecked} = useSelector((store) => store.auth);

	if(!isAuthChecked) return <LoadingPage />
	//return <Outlet/>; //Temp 
	return isAuthenticated ? <Outlet/> :  <Navigate to="/signin"  />;
}