import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Context/SocketProvider';
import './Lobby.css';

import EventList from '../../../Admin/AdminComponents/Event/EventList';
import { Link } from 'react-router-dom';

const LobbyScreen = () => {
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    e => {
      e.preventDefault();
      socket.emit('room:join', { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    data => {
      const { email, room } = data;
      navigate(`/video_call/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('email');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="content">
      {/* Top Bar */}
      <div className="main-nav">
        <div className="nav-left">
          <img
            src="https://d30mzt1bxg5llt.cloudfront.net/public/uploads/images/_signatoryLogo/VES-logo.png"
            alt="VESIT Logo"
            className="vesit-logo"
          />
          <span
            className="app-name"
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer' }}
          >
            VESLINK
          </span>
        </div>

        <div className="nav-center">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/people" className="nav-link">Connect</Link>
          <Link to="/job-board" className="nav-link">Jobs</Link>
          <Link to="/newsletter" className="nav-link">News</Link>
          <Link to="/Fund-Raising" className="nav-link">Fundraising</Link>
          <Link to="/messages" className="nav-link">Messages</Link>
          <Link to="/video_call" className="nav-link"> Join Room</Link>
          <Link to="/events" className="nav-link">Events</Link>

        </div>

        <div className="nav-right">
          <input type="text" placeholder="Search..." className="search-bar" />
          <div className="user-profile">
            <Link to={`/profile/${name}`} className="user-profile-link">
              <img
                src="https://randomuser.me/api/portraits/men/4.jpg"
                alt="User"
                className="profile-pic"
              />
              <span className="username">
                {name ? name : 'User'}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="lobby-content">
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="room">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
          <br />
          <button>Join</button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
