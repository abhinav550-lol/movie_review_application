import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import LoadingPage from "./subcomponents/LoadingPage.jsx";

export default function ProtectedRoute() {
	const {isAuthenticated , status} = useSelector((store) => store.auth);

	if(status === "loading") return <LoadingPage />
	
	//return <Outlet/>; //Temp 
	return isAuthenticated ? <Outlet/> :  <Navigate to="/signin"  />;
}