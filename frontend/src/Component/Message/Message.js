import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
import "./Message.css";

const socket = io("http://localhost:4000");

const Message = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientsTotal, setClientsTotal] = useState(0);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    socket.on("clients-total", (count) => setClientsTotal(count));

    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, { ...data, read: false }]);
    });

    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    socket.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(""), 2000);
    });

    socket.on("message-read", (messageId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  const joinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join-room", room);
    }
  };

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (message.trim() !== "") {
  //     const chatData = {
  //       id: Date.now(),
  //       user: username,
  //       message,
  //       room,
  //       timestamp: new Date(),
  //       read: false,
  //     };

  //     socket.emit("message", chatData);
  //     setMessages((prev) => [...prev, chatData]);
  //     setMessage("");
  //   }
  // };
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const chatData = { user: username, message, room, timestamp: new Date() };
      socket.emit("message", chatData);
      setMessage("");
    }
  };

  let typingTimeout;

  const handleTyping = () => {
    if (room) {
      socket.emit("typing", { username, room });
  
      // Clear the previous timeout to avoid multiple triggers
      clearTimeout(typingTimeout);
  
      // After 2 seconds of inactivity, emit "stopped typing"
      typingTimeout = setTimeout(() => {
        socket.emit("stopped-typing", room);
      }, 2000);
    }
  };
  

  useEffect(() => {
    socket.on("typing", (user) => {
      setTypingUser(user);
    });
  
    socket.on("stopped-typing", () => {
      setTypingUser("");
    });
  
    return () => {
      socket.off("typing");
      socket.off("stopped-typing");
    };
  }, []);
  
  
  return (
    <div className="chat-container">
      <h1 className="title">Chat 💬</h1>

      {!isLoggedIn ? (
        <div className="login-container-chat">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setIsLoggedIn(username.trim() !== "")}>
            Login
          </button>
        </div>
      ) : (
        <div className="main">
          <div className="name">
            <input type="text" className="name-input" value={username} disabled />
          </div>
          <div className="room_chat">
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join Room</button>
          </div>

          <ul className="message-container">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`message ${msg.user === username ? "right" : "left"} ${
                  msg.read ? "read" : ""
                }`}
              >
                <strong>{msg.user}:</strong> {msg.message}
                <span className="timestamp">{moment(msg.timestamp).format("HH:mm")}</span>
              </li>
            ))}
          </ul>

          {typingUser && <p className="typing">{typingUser} is typing...</p>}

          <form className="message-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleTyping}
              placeholder="Type a message..."
            />
            <button type="submit">Send ✈</button>
          </form>
        </div>
      )}

      <h3 className="clients-total">Total clients: {clientsTotal}</h3>
    </div>
  );
};

export default Message;

