import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

/**
 * AsyncThunk: Login
 * Handles user login by sending credentials to the backend.
 */
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: 'Login failed.' });
    }
});

/**
 * AsyncThunk: Register
 * Handles user registration by sending user data to the backend.
 */
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: 'Registration failed.' });
    }
});

/**
 * AsyncThunk: Forgot Password
 * Sends a password reset request to the backend.
 */
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, thunkAPI) => {
        try {
            const response = await axios.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to send reset email.' });
        }
    }
);

/**
 * AsyncThunk: Reset Password
 * Resets the user's password using a token and new password.
 */
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, thunkAPI) => {
        try {
            const response = await axios.post(`/auth/reset-password/${token}`, { password });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to reset password.' });
        }
    }
);

/**
 * Auth Slice
 * Manages authentication state, including user data, token, loading status, and error messages.
 */
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // Stores the logged-in user's details
        token: null, // Stores the authentication token
        error: null, // Stores error messages from failed requests
        loading: false, // Tracks the loading state for async operations
        message: null, // Stores success messages (e.g., reset email sent)
    },
    reducers: {
        /**
         * Reducer: Logout
         * Clears the user and token from the state to log out the user.
         */
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        /**
         * Reducer: Clear Error and Message
         * Resets error and success messages in the state.
         */
        clearNotifications: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle login success and failure
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.message;
            })

            // Handle registration success and failure
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload.message;
            })

            // Handle forgot password success and failure
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message; // Success message from the server
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Error message from the server
            })

            // Handle reset password success and failure
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message; // Success message from the server
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Error message from the server
            });
    },
});

// Export actions
export const { logout, clearNotifications } = authSlice.actions;

// Export the reducer to include in the store
export default authSlice.reducer;
