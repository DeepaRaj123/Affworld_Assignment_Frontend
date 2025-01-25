import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// Async Thunks

// Fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/tasks');
        return response.data;
    } catch (error) {
        // Return only the error message
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
});


// Create a new task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, thunkAPI) => {
    try {
        const response = await axios.post('/tasks', taskData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to create task');
    }
});

// Update a task's status
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, status }, thunkAPI) => {
    try {
        const response = await axios.put(`/tasks/${id}`, { status });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to update task');
    }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, thunkAPI) => {
    try {
        await axios.delete(`/tasks/${id}`);
        return id; // Return the task ID so it can be removed from the state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to delete task');
    }
});

// Slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],       // Array to hold tasks
        loading: false,  // Loading state for async operations
        error: null,     // Error messages for failed requests
    },
    reducers: {
        clearTaskError: (state) => {
            state.error = null; // Clear error state
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Task
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload); // Add new task to the list
                state.loading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Task
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload; // Update the task in the state
                }
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Task
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload); // Remove deleted task
                state.loading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the action to clear errors
export const { clearTaskError } = taskSlice.actions;

// Export the reducer
export default taskSlice.reducer;
