import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axiosInstance.post('/auth/forgot-password', { email });
            setSuccess(response.data.message || 'Password reset link sent to your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send password reset email. Try again.');
        } finally {
            setLoading(false);
        }
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
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <Typography component="p" variant="subtitle1" sx={{ color: 'gray' }}>
                        Enter your email to receive a password reset link.
                    </Typography>
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleForgotPassword}
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
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Reset Link'}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
