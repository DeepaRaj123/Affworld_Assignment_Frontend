import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask } from '../../store/slices/taskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Task columns
  const columns = ['Pending', 'Completed', 'Done'];

  // Group tasks by their status
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

  if (loading) return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>Loading tasks...</Typography>;
  if (error) return <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: '20px' }}>Error: {error}</Typography>;

  return (
    <div style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)', minHeight: '100vh', padding: '20px' }}>
      {/* Header with "Create Task" Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
          Task Board
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/tasks/create')} // Navigate to Create Task page
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Create Task
        </Button>
      </Box>

      {/* Task Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {columns.map((column) => (
            <Grid item xs={12} sm={6} md={4} key={column}>
              <Droppable droppableId={column} isDropDisabled={tasksByStatus[column].length === 0}>
                {(provided) => (
                  <Paper
                    elevation={5}
                    sx={{
                      padding: 3,
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      minHeight: 500,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' },
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                      {column}
                    </Typography>

                    {/* Display tasks in this column */}
                    {tasksByStatus[column].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: '15px',
                              transition: 'transform 0.2s ease',
                            }}
                          >
                            <TaskItem task={task} />
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
    </div>
  );
};

export default TaskBoard;
