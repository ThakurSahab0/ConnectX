import React, { useState }from "react";
import { useNavigate } from 'react-router-dom';
import "./HomePage.css"; // import the CSS file

const HomePage = () => {
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        navigate(`/room/${roomCode}`)
    }
    return (
        <div className="home-page1">
            <form onSubmit={handleFormSubmit} className="form1">
                <h2 className="head1">👋 Create OR Join a Room </h2>
                <div className="form-group">
                    <input value={roomCode} onChange={e => setRoomCode(e.target.value)} type="text" required placeholder="Enter Room Code"/>
                </div>
                <button className="submit1" type="submit">Join Room</button>
            </form>
        </div>
    );
};

export default HomePage;
