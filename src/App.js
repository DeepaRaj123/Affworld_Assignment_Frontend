import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import TaskBoard from './components/TaskManager/TaskBoard';
import CreateTask from './components/TaskManager/CreateTask';
import Feed from './components/Feed/Feed';
import Header from './components/Header';
import './App.css';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="main-container">
                <Routes>
                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Task Management */}
                    <Route path="/tasks" element={<TaskBoard />} />
                    <Route path="/tasks/create" element={<CreateTask />} />

                    {/* Feed Section */}
                    <Route path="/feed" element={<Feed />} />

                    {/* Default Route */}
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
