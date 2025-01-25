import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/slices/taskSlice';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const CreateTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description) {
            alert('Please fill in all fields');
            return;
        }

        dispatch(createTask({ name, description }));
        navigate('/tasks'); // Redirect to task board after creation
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f9f9f9',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
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
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#1976d2',
                            '&:hover': { backgroundColor: '#1565c0' },
                        }}
                    >
                        Create Task
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateTask;
