import React, { useState, useEffect, useRef } from 'react';

const WebSocketClient: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Create a WebSocket connection
        socketRef.current = new WebSocket('ws://localhost:8080/ws');

        // Handle incoming messages
        socketRef.current.onmessage = (event: MessageEvent) => {
            const newMessage = event.data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        // Clean up the WebSocket connection on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (socketRef.current && inputValue.trim()) {
            // Send the message to the WebSocket server
            socketRef.current.send(inputValue);
            setInputValue(''); // Clear the input field
        }
    };

    return (
        <div>
            <h1>WebSocket Client (Plain WebSocket)</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketClient;