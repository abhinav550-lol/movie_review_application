import axios from "axios";

export const fetchUserProfile = async (userId) => {
	const userProfileApi = import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}`;

	const res = await axios.get(userProfileApi);

	return res.data;
}