import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import './Message.css';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:4000');

const Message = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientsTotal, setClientsTotal] = useState(0);
  const [typingUser, setTypingUser] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const roomOptions = [
    'Placement Discussions',
    'General Foreign Studies',
    "Master's in Science (MS)",
    "Master's in Business Analytics (MBA)",
    'GATE Examination',
  ];

  useEffect(() => {
    socket.on('clients-total', count => setClientsTotal(count));
    socket.on('chat-message', data =>
      setMessages(prev => [...prev, { ...data, read: false }])
    );
    socket.on('chat-history', history => setMessages(history));
    socket.on('typing', user => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(''), 2000);
    });

    socket.on('message-read', messageId => {
      setMessages(prev =>
        prev.map(msg => (msg.id === messageId ? { ...msg, read: true } : msg))
      );
    });

    return () => socket.disconnect();
  }, []);


  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('email');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const joinRoom = () => {
    if (room.trim() !== '') {
      socket.emit('join-room', room);
    }
  };

  const sendMessage = e => {
    e.preventDefault();
    if (message.trim()) {
      const chatData = { user: username, message, room, timestamp: new Date() };
      socket.emit('message', chatData);
      setMessage('');
    }
  };

  let typingTimeout;
  const handleTyping = () => {
    if (room) {
      socket.emit('typing', { username, room });

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socket.emit('stopped-typing', room);
      }, 2000);
    }
  };

  return (
    <div className="home-container">
      {/* Top Bar */}
      <div className="top-bar">
        <span className="app-name">VESIT Link</span>
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="user-profile">
          <Link to={`/profile/${name}`} className="user-profile-link">
            <img
              src="https://randomuser.me/api/portraits/men/4.jpg"
              alt="User"
              className="profile-pic"
            />
            <span style={{ fontSize: '17px', fontWeight: 'bold' }}>
              {name ? name : 'User'}!
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content with Three Columns */}
      <div className="main-content">
        {/* Left Navigation Bar */}
        <div className="left-bar">
          <Link to={`/profile/${name}`} >
            <button>Profile</button>
          </Link>
          <Link to="/people" className="find-people">
            <button>Find People!</button>
          </Link>
          <Link to="/messages">
            <button>Messages</button>
          </Link>
          <Link to="/job-board">
            <button>Job Board</button>
          </Link>
          <Link to="/newsletter">
            <button>Newsletters</button>
          </Link>
          <Link to="/video_call">
            <button>Video Call</button>
          </Link>
          <Link to="/forum" className="big-forum-button">
            <button>🚀 Connect with Seniors!</button>
          </Link>
        </div>

        {/* Center Column for Internships */}
        <div className="center-bar1">
          <div className="chat-container">
            <h1 className="title">Chat 💬</h1>

            {!isLoggedIn ? (
              <div className="login-container-chat">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <button onClick={() => setIsLoggedIn(username.trim() !== '')}>
                  Login
                </button>
              </div>
            ) : (
              <div className="main">
                <div className="name">
                  <input
                    type="text"
                    className="name-input"
                    value={username}
                    disabled
                  />
                </div>

                {/* Room Selection with Dropdown */}
                <div className="room_chat" ref={dropdownRef}>
                  <div className="room-input-container">
                    <input
                      type="text"
                      placeholder="Enter room name"
                      value={room}
                      onChange={e => setRoom(e.target.value)}
                      onFocus={() => setShowDropdown(true)} // Show dropdown when clicking inside input
                    />
                    <button
                      className="dropdown-button"
                      onClick={e => {
                        e.stopPropagation(); // Prevent event bubbling
                        setShowDropdown(prev => !prev);
                      }}
                    >
                      ▼
                    </button>
                  </div>

                  {showDropdown && (
                    <ul className="dropdown-menu">
                      {roomOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setRoom(option);
                            setShowDropdown(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}

                  <button onClick={joinRoom}>Join Room</button>
                </div>

                <ul className="message-container">
                  {messages.map((msg, index) => (
                    <li
                      key={index}
                      className={`message ${msg.user === username ? 'right' : 'left'
                        } ${msg.read ? 'read' : ''}`}
                    >
                      <strong>{msg.user}:</strong> {msg.message}
                      <span className="timestamp">
                        {moment(msg.timestamp).format('HH:mm')}
                      </span>
                    </li>
                  ))}
                </ul>

                {typingUser && (
                  <p className="typing">{typingUser} is typing...</p>
                )}

                <form className="message-form" onSubmit={sendMessage}>
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={handleTyping}
                    placeholder="Type a message..."
                  />
                  <button type="submit">Send ✈</button>
                </form>
              </div>
            )}

            <h3 className="clients-total">Total clients: {clientsTotal}</h3>
          </div>
        </div>

        {/* Right Column for Peer Discovery and Events */}
        <div className="right-bar">
          <div className="discover-peers">
            <h2>Discover Your Peers</h2>
            <ul>
              <li>
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Alice Johnson"
                  />
                  <div className="peer-info">
                    <h3>Alice Johnson</h3>
                    <p>
                      Frontend Developer at XYZ Inc. Passionate about design and
                      usability.
                    </p>
                  </div>
                  <button>+Follow</button>
                </div>
              </li>
              <li>
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="Michael Smith"
                  />
                  <div className="peer-info">
                    <h3>Michael Smith</h3>
                    <p>
                      Data Scientist. Enthusiast for machine learning and
                      analytics.
                    </p>
                  </div>
                  <button>+Follow</button>
                </div>
              </li>
              <li>
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/3.jpg"
                    alt="Emma Wilson"
                  />
                  <div className="peer-info">
                    <h3>Emma Wilson</h3>
                    <p>
                      UI/UX Designer. Always learning new trends and improving
                      designs.
                    </p>
                  </div>
                  <button>+Follow</button>
                </div>
              </li>
              {/* Repeat similar structure for other peers */}
            </ul>
          </div>
          <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
