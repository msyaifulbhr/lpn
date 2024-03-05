import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    admin: null,
    isError: false,
    IsSuccess: false,
    isLoading: false,
    message:""
}

export const LoginAdmin = createAsyncThunk("admin/LoginAdmin", async(admin, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3636/login', {
            email: admin.email,
            password: admin.password
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("admin/getMe", async(_ , thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:3636/me');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("admin/LogOut", async() => {
    await axios.delete('http://localhost:3636/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginAdmin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.IsSuccess= true;
            state.admin = action.payload;
        });
        builder.addCase(LoginAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError= true;
            state.message = action.payload;
        })

        //get login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.IsSuccess= true;
            state.admin = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError= true;
            state.message = action.payload;
        })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;