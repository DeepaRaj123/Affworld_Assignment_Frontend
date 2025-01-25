import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/slices/taskSlice';
import { Box, TextField, Button, Typography, Paper, CircularProgress, MenuItem } from '@mui/material';

const CreateTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending'); // Added status field
    const [loading, setLoading] = useState(false); // Added loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true); // Set loading state to true when the request starts
        try {
            await dispatch(createTask({ name, description, status })); // Dispatch createTask action
            navigate('/tasks'); // Redirect to task board after creation
        } catch (error) {
            alert('Failed to create task');
        } finally {
            setLoading(false); // Set loading state to false after task creation
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: '8px',
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    Create Task
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Task Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </TextField>

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#1976d2',
                            '&:hover': { backgroundColor: '#1565c0' },
                            padding: '10px',
                            fontSize: '16px',
                        }}
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Create Task'
                        )}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateTask;
