import { useDispatch } from 'react-redux';
import { clearAuth } from '../../store/reducers/authSlice.js';
import { logoutUser } from '../../api/userApi.js';
import { showToast } from '../../utils/utils';

const Logout = ({ classes }) => {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await logoutUser();    
			dispatch(clearAuth()); 
			showToast("Logged out successfully", "success");
			setTimeout(() => {
				window.location.reload();
			}, 1200);
		} catch (err) {
			console.log(err)
			showToast("Logout failed", "error");
		}
	};

	return (
		<div
			className={`${classes} cursor-pointer hover:underline `}
			onClick={handleLogout}
		>
			Logout
		</div>
	);
};

export default Logout;