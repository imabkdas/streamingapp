import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import './Chat.css';

const getRandomName = () => {
    const names = ['Alex', 'Charlie', 'Jordan', 'Taylor', 'Morgan', 'Sam', 'Casey', 'Jamie', 'Drew', 'Riley'];
    return names[Math.floor(Math.random() * names.length)];
};

const WebSocketClient = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username] = useState(getRandomName());
    const socketRef = useRef(null);

    useEffect(() => {
        const groupId = new URLSearchParams(window.location.search).get('group');
        socketRef.current = io("http://localhost:8081", { 
            transports: ["websocket", "polling"],
            query: { groupId, username }
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to server');
        });

        socketRef.current.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (inputValue.trim()) {
            const groupId = new URLSearchParams(window.location.search).get('group'); // Get groupId from URL
            const message = { id: uuidv4(), username, message: inputValue, groupId }; // Include groupId
            console.log('Sending message:', message); // Log the message object
            socketRef.current.emit('message', message); // Send the message object
            setInputValue('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">Group Chat</div>
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.username === username ? 'own' : ''}`}>
                        <div className="profile-pic">{msg.username.charAt(0)}</div>
                        <div className="message-content">
                            <div className="username">{msg.username}</div>
                            <div className="text">{msg.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default WebSocketClient;
