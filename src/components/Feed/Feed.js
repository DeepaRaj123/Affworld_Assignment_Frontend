import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../../store/slices/postSlice';
import { Grid, Card, CardContent, Typography, TextField, Button, CircularProgress, Alert, Box } from '@mui/material';

const Feed = () => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  // Fetch posts when the component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Handle form submission for creating a post
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    // Ensure both caption and photo are provided
    if (!caption || !photo) {
      alert('Please provide both a caption and a photo.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('photo', photo);

    dispatch(createPost(formData));

    // Reset form fields after submission
    setCaption('');
    setPhoto(null);
  };

  // Render loading and error states
  if (loading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, blue, #fafafa)',
        minHeight: '100vh',
      }}
    >
      {/* Form to create a new post */}
      <Box
        sx={{
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Create a Post
        </Typography>
        <form onSubmit={handlePostSubmit} style={{ width: '100%' }}>
          <TextField
            label="Caption"
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            sx={{ marginBottom: 2 }}
            variant="outlined"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{ marginBottom: 16 }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              padding: '10px 20px',
              fontSize: '16px',
              width: '100%',
            }}
          >
            Post
          </Button>
        </form>
      </Box>

      {/* Render feed posts */}
      <Grid container spacing={3} sx={{ paddingTop: 2 }}>
        {posts.map((post) => (
          <Grid item xs={12} md={4} key={post._id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {post.photo && (
                <img
                  src={post.photo}
                  alt={post.caption}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
              )}
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {post.caption}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Feed;
