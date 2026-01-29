import  {Bounce, toast} from 'react-toastify';

const toastOptions =  {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	transition: Bounce,
};

export function showToast(message , type='info'){
	if(type == 'error'){
		toast.error(message , toastOptions);
	}else if(type == 'success'){
		toast.success(message , toastOptions);
	}else {
		toast.info(message , toastOptions);
	}
}