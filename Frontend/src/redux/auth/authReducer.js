import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// User Actions Thunk Middlewares Start

export const loginUserAction = createAsyncThunk('auth/login',
    async (loginData, {rejectWithValue}) => {
        try {
            console.log('Inside the Thunk, DATA::',loginData.data);
            const {data} = await axios.post(`${BASE_URL}/auth/signin`, loginData.data);
            if(data.token){
                localStorage.setItem('jwtToken', data.token);
                return data;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const registerUserAction = createAsyncThunk('auth/register',
    async (signUpData, {rejectWithValue}) => {
        try {
            console.log('Inside the Thunk, DATA::',signUpData.data);
            const { data } = await axios.post(`${BASE_URL}/auth/signup`, signUpData.data);
            if(data.token){
                localStorage.setItem('jwtToken', data.token);
                return data;
            }
        } catch (error) {
           return rejectWithValue(error.message); 
        }
    }
)

// User Action Thunk Middlewares End

const initialState = {
    loading: false,
    error: null,
    userStatus:'',
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout : (state) => {
            localStorage.removeItem('jwtToken')
            console.log('logging Out...');
            return { ...state, userStatus: 'loggedOut' }
       },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.userStatus = 'loading';            
        })
        .addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.userStatus='loggedin';
            console.log('LoggedIn...');
        })
        .addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.userStatus = 'failed';
            console.log('Failed Login..');
        })
        .addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.userStatus = 'registering';
            console.log('Registering user...');
        })
        .addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.userStatus = 'registered';
            console.log('Registered...');
        })
        .addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.userStatus = 'failed';
            console.log('Registration failed!');
        })
    }
})

export const {
    logout
} = authSlice.actions;

export default authSlice.reducer;