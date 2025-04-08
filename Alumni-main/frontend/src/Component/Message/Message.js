import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import './Message.css';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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

      {/* Main Content with Three Columns */}
      <div className="main-content">

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
          <div className="right-card alumni-spotlight">
            <h3 className="card-title">Alumni Spotlight</h3>
            <div className="spotlight-content">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Featured Alumni" className="spotlight-image" />
              <div className="spotlight-info">
                <h4>Raj Patel</h4>
                <p>CTO at TechFusion</p>
                <p>VESIT Class of 2015</p>
                <a href="#" className="spotlight-link">Read his success story</a>
              </div>
            </div>
          </div>

          <div className="right-card discover-peers">
            <h3 className="card-title">Connect with Alumni</h3>
            <ul className="peer-list">
              <li className="peer-item">
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Alice Johnson"
                  />
                  <div className="peer-info">
                    <h4>Alice Johnson</h4>
                    <p>Frontend Developer at XYZ Inc.</p>
                  </div>
                  <button className="connect-button">Connect</button>
                </div>
              </li>
              <li className="peer-item">
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="Michael Smith"
                  />
                  <div className="peer-info">
                    <h4>Michael Smith</h4>
                    <p>Data Scientist at Analytics Co.</p>
                  </div>
                  <button className="connect-button">Connect</button>
                </div>
              </li>
              <li className="peer-item">
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/3.jpg"
                    alt="Emma Wilson"
                  />
                  <div className="peer-info">
                    <h4>Emma Wilson</h4>
                    <p>UI/UX Designer at DesignHub</p>
                  </div>
                  <button className="connect-button">Connect</button>
                </div>
              </li>
            </ul>
          </div>

          <div className="right-card upcoming-events">
            <h3 className="card-title">Upcoming Events</h3>
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
