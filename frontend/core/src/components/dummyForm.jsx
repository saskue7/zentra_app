import { useState,useEffect } from "react";

const data = {
    "id": 1,
    "id1": 1,
    "id2": 1,
    "id3": 1,
    "id4": 1,

}

const Chat = ({messages }) => {
    const [input, setInput] = useState('');
    const [localMessages, setLocalMessages] = useState([]);
    // const { user } = useAuth();

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages]);
    const handleSubmit = async () => {

        try {
            
            const newMessage = {
                content: input
            };
            setLocalMessages(prevMessages =>  [ newMessage,...prevMessages]);
            setInput('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return (
        <div>
            
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Send Message</button>
            {localMessages && localMessages.map((message, index) => (
                <div key={index}>
                    <p>{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Chat;