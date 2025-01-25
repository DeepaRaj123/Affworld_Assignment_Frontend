import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask } from '../../store/slices/taskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Paper, Typography } from '@mui/material';
import TaskItem from './TaskItem';

const TaskBoard = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const columns = ['Pending', 'Completed', 'Done'];

    // Group tasks by status
    const tasksByStatus = columns.reduce((acc, status) => {
        acc[status] = tasks.filter((task) => task.status === status);
        return acc;
    }, {});

    // Handle drag-and-drop event
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // If dropped outside the droppable area
        if (!destination) return;

        // If the item was moved to another column
        if (destination.droppableId !== source.droppableId) {
            dispatch(updateTask({ id: draggableId, status: destination.droppableId }));
        }
    };

    if (loading) return <Typography>Loading tasks...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={3} sx={{ padding: 2 }}>
                {columns.map((column) => (
                    <Grid item xs={12} sm={6} md={4} key={column}>
                        <Droppable droppableId={column} isDropDisabled={tasksByStatus[column].length === 0}>
                            {(provided) => (
                                <Paper
                                    elevation={3}
                                    sx={{
                                        padding: 2,
                                        backgroundColor: '#f5f5f5',
                                        minHeight: 400,
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        {column}
                                    </Typography>
                                    {tasksByStatus[column].map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskItem
                                                        task={task}
                                                        draggableProps={provided.draggableProps}
                                                        dragHandleProps={provided.dragHandleProps}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Paper>
                            )}
                        </Droppable>

                    </Grid>
                ))}
            </Grid>
        </DragDropContext>
    );
};

export default TaskBoard;
