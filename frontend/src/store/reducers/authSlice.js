import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuthenticated: false , isAuthChecked : false},
  reducers: {
    setAuth: (state, action) => { // login or register 
      state.user = action.payload;
      state.isAuthenticated = true;
	  state.isAuthChecked = true;
    },
    clearAuth: (state) => { //logout 
      state.user = null;
      state.isAuthenticated = false;
	  state.isAuthChecked = true;
    },
  },
});


export default authSlice.reducer;
export const { setAuth, clearAuth } = authSlice.actions;