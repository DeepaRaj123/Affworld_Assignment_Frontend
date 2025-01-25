import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './App.css';

// Create a Material-UI theme
const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
    typography: {
        fontFamily: 'Roboto, Arial',
    },
});

// Create a React root for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
