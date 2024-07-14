import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import ChatForm from './components/ChatForm';
import SingleChat from './components/SingleChat';
import Chat from './components/dummyForm';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/chats" element={<ChatForm />} />
                    <Route path="/chats/:string" element={<SingleChat />} />
                    <Route path="/chats/test" element={<Chat />} />
                    <Route path='*' element={<p>404 page not found</p>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
