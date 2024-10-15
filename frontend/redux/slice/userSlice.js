
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    user: null,     
    isLoading:false, 
    error: null,
    success:false      
};

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (data) => {
      const response = await axios.post("http://localhost:8000/api/user/login", data,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  );
  
export const logoutUser=createAsyncThunk(
    "user/logoutUser",
    async ()=>{
        const response = await axios.post("http://localhost:8000/api/user/logout", {},
            { withCredentials: true }
          );
          localStorage.removeItem("user");
          return response.data;
    }
)  

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

      toggleSuccess:(state,action)=>{
        state.success=false;
      }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
          state.error=null;
          state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error=null;
          state.success=true;
          state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });


        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = [];
          });
          builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          });

      },
});


export const {toggleSuccess}=userSlice.actions;
export default userSlice.reducer;