import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/posts');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (formData, thunkAPI) => {
    try {
        const response = await axios.post('/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

/**
 * Post Slice
 * Manages the state for posts, including fetching and creating posts.
 */
const postSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            });
    },
});

export default postSlice.reducer;
