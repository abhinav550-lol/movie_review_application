
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/utils';

const ProtectedControls = ({ children , message , classes }) => {
	const { isAuthenticated, isAuthChecked } = useSelector((store) => store.auth);

	const handleClick = (e) => {
		if(!isAuthChecked) {
			return showToast("Please wait...." , "info")
		}

		if(!isAuthenticated){
			return showToast(message, "error");
		}
	}

	return (
		<span className={classes}  onClick={handleClick}>
			{children}
		</span>
	)
}

export default ProtectedControls
