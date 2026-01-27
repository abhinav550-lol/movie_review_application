import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    setAuth: (state, action) => { // login or register 
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => { //logout 
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});


export default authSlice.reducer;
export const { setAuth, clearAuth } = authSlice.actions;