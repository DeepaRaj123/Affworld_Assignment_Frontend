import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/slices/authSlice';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
    };

    const handleGoogleLogin = () => {
        // Logic for Google OAuth
        window.location.href = 'http://localhost:5000/api/auth/google'; // Update this for production
    };

    return (
        <div style={{
            background: 'linear-gradient(to bottom right, #00c6ff, #0072ff)', // Gradient background
            backgroundSize: 'contain',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
        }}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'white', 
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
                        Register
                    </Typography>
                    <form onSubmit={handleRegister} style={{ width: '100%' }}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        />
                       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Register
                            </Button>
                        </Box>
                    </form>

                    {/* Google Login Button */}
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
            </Container>
        </div>
    );
};

export default Register;
