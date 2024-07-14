import { useState, useEffect } from "react";
import {  getInterests } from "../apiService";
import { useAuth } from "../AuthContext";
import SingleChat from "./SingleChat";
import { useNavigate } from "react-router-dom";

const ChatForm = () => {
    // const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [tel, setTel] = useState([]);
    const { user } = useAuth();
    // const [selectedChat, setSelectedChat] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let interestData = await getInterests();
            
            let filteredInterests = interestData.data.filter(interest => 
                (interest.sender.username === user.username || interest.receiver.username === user.username) && 
                interest.status === "accepted"
            );

    
            console.log(filteredInterests)
          
            let total = new Set();
            for (let i = 0; i < filteredInterests.length; i++) {
                if (filteredInterests[i].sender.username === user.username) {
                    total.add(filteredInterests[i].receiver.username);
                } else {
                    total.add(filteredInterests[i].sender.username);
                }
            }

            total = Array.from(total);
            setTel(total)
            
           
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
            setError('Failed to fetch data.');
        }
    };

    const handleChatClick = (username) => {
        navigate(`/chats/${username}`)
    };
    const loginPage = () => {
        navigate('/login');
    }

    return (
        <div>
            <h1>Chats</h1>

                {!user ? <p>Login for this page to show <button onClick={() => loginPage()}>Login</button></p> : tel.map(user => (
                    <div >
                        <p onClick={() => handleChatClick(user)}>{user} </p>
                        <hr />
                    </div>
                ))
            }
                
        </div>
    );
};

export default ChatForm;
