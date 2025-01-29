import React from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage : React.FC = () => {

    const navigate = useNavigate();

    const createGroup = () => {
        const newGroupId = Math.random().toString(36).substr(2, 9);
        navigate(`/chat?group=${newGroupId}`);
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to Group Chat</h1>
            <button onClick={createGroup} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Create Group
            </button>
        </div>
    )
}

export default  LandingPage;