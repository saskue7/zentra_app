// frontend/src/components/Home.js
import React,{useState,useEffect, useCallback} from 'react';
import { useAuth } from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { getInterests, getUsers,updateInterest,getMessages } from '../apiService';
import RequestModal from './RequestModal';
import ChatForm from './ChatForm';


const Home = () => {
    
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [interests,setInterests] = useState([]);
    const [recinterests,setRecinterests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
            // getting all users
            getUsers ()
            .then(response => {
                // console.log(response.data)
                const filtered_data = filterData(response.data,user)
                // console.log(user,filtered_data)
                setUsers(filtered_data);
                // setDep(filtered_data)
            })
            .catch(error => {
                console.error('Error fetching sent interests:', error.response.data);
                setError('Failed to fetch sent interests.');
            });

            // getting all the interests
            getInterests()
            .then(response => {
                setInterests(response.data);
                let data = response.data.filter(person => person.receiver.username == user.username);
                data = data.filter(person => person.status === 'pending')
                setRecinterests(data);
                
            })
            .catch(error => {
                console.error('Error fetching sent interests:', error.response.data);
                setError('Failed to fetch sent interests.');
            }); 

            

                
    }, []);
    
    const handleLogout = () => {
        logout();
    };
    const filterData = (data, user) => {
        return data.filter(person => person.username != user.username);
      };
    const handleRequest = (username) => {
        // let data = sentRequests(users,interests)
        // console.log(data)
        // setDep(data)
        // setNewUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setSelectedUserId(username);
        setShowModal(true);
        
    }

    const sentRequests = (users,interests) => {
        
        let data = new Set()
        let newUsers = []
        // console.log(users)
        // console.log(interests)
        // console.log("Start")
        
        for(let i=0;i<interests.length;i++){
                if (interests[i].sender.username == user.username  ){
                data.add(interests[i].receiver.username)  
                }
                if ( interests[i].receiver.username == user.username && interests[i].status === 'accepted' ){
                    data.add(interests[i].sender.username)  
                    }

                
            
            } 
        data = Array.from(data)
        // console.log(data,typeof data) 
        for(let i=0;i<users.length;i++){    
            let flag = 0
            for(let j=0;j<data.length ;j++){

                if (users[i].username == data[j]){
                    flag = 1
                    break
                }
            }
            if (!flag){
                newUsers.push(users[i])
            }
        }
        // console.log(newUsers)
        return newUsers
    } 
    const handleAccept = (id) =>{
        updateInterest(id,{"status":"accepted"})
        window.location.reload();
    }
    const handleReject = (id) => {
        updateInterest(id,{"status":"rejected"})
        window.location.reload()
    } 
    const handleChatClick = () => {
        
        navigate(`chats/`);
    };
    const loginPage = () => {
        navigate('login/');
    }
    return (
        <div className='home'>
            <h1>Welcome to the Home Page</h1>
            { user && 
            (<div className='main'>
                <h2>Hello, {user.username}!</h2>
                <br />
                <br />

                <div className='sendRequests'>
                <h3>Send Request</h3>
                {sentRequests(users,interests).length === 0 && <p>no users</p>}
                {sentRequests(users,interests).map(user => (
                    <div key={user.id} >
                        <p>User: {user.username} <button onClick={() => handleRequest(user.username)}>Send Request</button></p>
                        </div>
                ))}
                </div>
                <br />
                <br />
                
                <div className='requests'>
                <h3>Received Requests</h3>
                {recinterests.length === 0 && <p>no requests yet</p>}
                {recinterests.map(user => (
                    <div key={user.id} >
                        <p>sender : {user.sender.username} <button onClick={() => handleAccept(user.id)} >Accept</button> <button onClick={() => handleReject(user.id)}>Reject</button> </p>
                    </div>
                ))}
                </div>
                {/* Add authenticated user content here */}
                <button onClick={handleLogout}>Logout</button>
                <RequestModal
                isOpen={showModal} 
                onRequestClose={() => setShowModal(false)} 
                receiver_username={selectedUserId}
                sender_username={user.username} />
                <br />
                <br />

                <button onClick={handleChatClick}>--------Chats-------</button>
                {/* <a href="http://localhost:5173/chats">CHats-</a> */}
                {/* <ChatForm /> */}


            </div>)}
            {!user && <p>Login for more details <button onClick={() => loginPage()} >Login</button></p>}
            
        </div>
    );
};

export default Home;
