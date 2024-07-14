// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/api/login/', { username, password })
            .then(response => {
                console.log(response.data);
                login({"username":username});  // Assuming API returns user data upon successful login
                navigate('/');  // Redirect to home page
            })
            .catch(error => {
                console.error('Error logging in:', error.response.data);
                setError('Invalid username or password.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;
