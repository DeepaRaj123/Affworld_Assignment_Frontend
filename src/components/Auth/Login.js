import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid, Paper, CircularProgress, Alert, Link } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const { token } = response.data;

            // Save token to localStorage or state management
            localStorage.setItem('token', token);

            // Redirect to dashboard or home page
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Logic for Google OAuth
        window.location.href = 'http://localhost:5000/api/auth/google'; // Update this for production
    };

    return (
        <Grid
            container
            component="main"
            sx={{
                height: '100vh',
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            }}
        >
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
                sx={{
                    margin: 'auto',
                    borderRadius: 3,
                    maxWidth: 400,
                    padding: 4,
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography component="h1" variant="h4">
                        Welcome Back!
                    </Typography>
                    <Typography component="p" variant="subtitle1" sx={{ color: 'gray' }}>
                        Log in to continue
                    </Typography>
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleLogin}
                    sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1,
                            backgroundColor: '#2575fc',
                            '&:hover': { backgroundColor: '#1a66d4' },
                        }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
                    </Button>
                    <Link href="/forgot-password" variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                        Forgot Password?
                    </Link>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        mt: 3,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="subtitle1">Or log in with:</Typography>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        sx={{
                            color: '#4285F4',
                            borderColor: '#4285F4',
                            '&:hover': { backgroundColor: 'rgba(66, 133, 244, 0.1)' },
                        }}
                    >
                        Google
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
