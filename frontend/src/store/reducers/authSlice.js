import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchMe = createAsyncThunk(
	"user/me",
	async (_, { rejectWithValue }) => {
		try{
			const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/user/me" , {
				withCredentials: true,
			});
			return res.data;
		}catch(err){
			return rejectWithValue(err.response?.data?.message);
		}
	}
);

export const logoutMe = createAsyncThunk(
	"user/logout" , 
	async(_ , {rejectWithValue}) => {
		try {
			await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/logout" , {} , {
				withCredentials: true,	
			});
			return ;
		}catch(err){
			return rejectWithValue(err.response?.data?.message);
		}
	}
)

const authSlice = createSlice({
  name: "auth",
  initialState: { data: null, status: "idle", isAuthenticated: false , error : null},
  extraReducers: (builder) => {
    builder
	//FetchMe
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.user;
		state.isAuthenticated = action.payload.isAuthenticated;
      })
	  .addCase(fetchMe.rejected, (state, action) => {
		state.status = "error";
		state.error = action.payload;
	})
	//LogoutMe
	.addCase(logoutMe.pending , (state) => {
		state.status = "loading";
	})
	.addCase(logoutMe.fulfilled , (state) => {
		state.status = "success";
		state.data = null;
		state.isAuthenticated = false;
	})
	.addCase(logoutMe.rejected , (state , action) => {
		state.status = "error";
		state.error = action.payload;
	})
  },
});

export default authSlice.reducer;