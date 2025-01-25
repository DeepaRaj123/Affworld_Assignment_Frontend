import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import postReducer from './slices/postSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,  // Handles user authentication state
        tasks: taskReducer, // Handles task management state
        posts: postReducer, // Handles feed/post management state
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable state check (if using non-serializable data like FormData)
        }),
});

export default store;
