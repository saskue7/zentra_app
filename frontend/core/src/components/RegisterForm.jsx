// frontend/src/components/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/register/', { username, password, email })
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.error('Error registering:', error.response.data);
                setError('Registration failed.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegisterForm;
