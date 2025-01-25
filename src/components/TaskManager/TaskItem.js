import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/slices/taskSlice';
import { deleteTask } from '../../store/slices/taskSlice';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();

    const handleMarkComplete = () => {
        dispatch(updateTask({ id: task._id, status: 'Completed' }));
    };

    const handleMarkDone = () => {
        dispatch(updateTask({ id: task._id, status: 'Done' }));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task._id)); // Dispatch the action with the task ID
        }
    };

    return (
        <Card
            sx={{
                mb: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                },
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {task.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {task.description}
                </Typography>

                {/* Conditional Buttons */}
                {task.status === 'Pending' && (
                    <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={handleMarkComplete}
                    >
                        Mark Complete
                    </Button>
                )}

                {task.status === 'Completed' && (
                    <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={handleMarkDone}
                    >
                        Mark Done
                    </Button>
                )}

                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default TaskItem;
