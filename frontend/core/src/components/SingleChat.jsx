import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { sentMessage } from "../apiService";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMessages } from "../apiService";

const SingleChat = () => {
    
    const { string } = useParams();
    const [input, setInput] = useState('');
    const [localMessages, setLocalMessages] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            let messageData = await getMessages();
            console.log(messageData.data)
            let filteredMessages = messageData.data.filter(message => 
                (message.sender.username === user.username && message.receiver.username === string) || (message.receiver.username === user.username && message.sender.username === string)
            );
            setLocalMessages(filteredMessages)
            
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
        }
    };


    const handleSubmit = async () => {
        const data = {
            sender_username: user.username,
            receiver_username: string,
            content: input
        };

        try {
            await sentMessage(data);
           
            
            setInput('');
            window.location.reload()
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    const goBack = () => {
        navigate('/chats')
    }
    const loginPage = () => {
        navigate('/login');
    }


    return (
        <div>
            {!user ?  <p>Login for this page to show <button onClick={() => loginPage()}>Login</button> </p> 
            :   <><button onClick={() => goBack()}>Back to Chats</button>
            <h2>Chat with {string}</h2>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Send Message</button>
            {localMessages && localMessages.map((message, index) => (
                <div key={index}>
                    <p>{message.sender.username}: {message.content}</p>
                </div>
            ))}</>}
            
        </div>
    );
};

export default SingleChat;
