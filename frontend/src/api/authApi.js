import axios from "axios";

export const fetchMe = async () => {
	const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/me", {
		withCredentials: true,
	});
	return res.data;
}

export const logoutMe = async () => {
	const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/logout", {}, {
		withCredentials: true,
	});
	return res.data;
}

export const registerUser = async (formData) => {
	const registerApi = import.meta.env.VITE_BACKEND_URL + '/api/users/register';

	const res = await axios.post(registerApi, formData, {
		withCredentials: true,
	});
	return res.data;
}

export const loginUser = async (formData) => {
	const loginApi = import.meta.env.VITE_BACKEND_URL + '/api/users/login';

	const res = await axios.post(loginApi, formData, {
		withCredentials: true,
	});
	return res.data;
}