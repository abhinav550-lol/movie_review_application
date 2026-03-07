
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/utils';

const ProtectedControls = ({ children, message, classes }) => {
	const { isAuthenticated, isAuthChecked } = useSelector((store) => store.auth);

	const handleClick = (e) => {

		if (!isAuthChecked) {
			e.stopPropagation();
			return showToast("Please wait....", "info")
		}

		if (!isAuthenticated) {
			e.preventDefault(); 
			e.stopPropagation();
			return showToast(message, "error");
		}
	}

	return (
		<span className={classes} onClickCapture={handleClick}>
			{children}
		</span>
	)
}

export default ProtectedControls
