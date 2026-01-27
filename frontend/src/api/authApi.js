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