// frontend/src/components/RequestModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { sentRequest } from '../apiService';// Make sure you have a function to handle the API call

const RequestModal = ({ isOpen, onRequestClose, sender_username,receiver_username }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (message){
                data = {
                    "sender_username":sender_username,
                    "receiver_username":receiver_username,
                    "message":message
                }

            }
            else{
                data = {
                    "sender_username":sender_username,
                    "receiver_username":receiver_username
                }
            }
            await sentRequest(data); // Adjust this according to your API service
            onRequestClose();
            window.location.reload()
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Send Request</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Message:
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
                <button type="submit">Send</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default RequestModal;
