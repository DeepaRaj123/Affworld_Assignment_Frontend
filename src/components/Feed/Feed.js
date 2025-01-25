import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../../store/slices/postSlice';
import { Grid, Card, CardContent, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';

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
        <div style={{ padding: 20 }}>
            {/* Form to create a new post */}
            <form onSubmit={handlePostSubmit} style={{ marginBottom: 20 }}>
                <TextField
                    label="Caption"
                    fullWidth
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    style={{ marginBottom: 16 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Post
                </Button>
            </form>

            {/* Render feed posts */}
            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} md={4} key={post._id}>
                        <Card>
                            {post.photo && (
                                <img
                                    src={post.photo}
                                    alt={post.caption}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
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
