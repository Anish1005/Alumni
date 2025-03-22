import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Convert **bold** to <b>bold</b>
      .replace(/\n/g, "<br>") // Preserve line breaks
      .replace(/• /g, "🔹 ") // Convert bullet points to visual markers
      .replace(/\d+\.\s/g, (match) => `<br>${match}`); // Ensure numbered lists are well formatted
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [{ role: "user", parts: [{ text: input }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: "AIzaSyDUIN4oveLZyR-CsMHr-H_K9_tC2CfmLws" },
        }
      );

      let botReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      botReply = formatText(botReply);

      const botMessage = { text: botReply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Oops! Something went wrong.", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <>
      <button onClick={toggleChat} style={styles.chatButton}>
        💬 Chat
      </button>

      {isOpen && (
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <span>Chatbot</span>
            <button onClick={toggleChat} style={styles.closeButton}>✖</button>
          </div>
          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={msg.sender === "user" ? styles.userMessage : styles.botMessage}
                dangerouslySetInnerHTML={{ __html: msg.text }} // Render formatted text
              />
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#0084ff",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  chatContainer: {
    position: "fixed",
    bottom: "70px",
    right: "20px",
    width: "350px",
    height: "450px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  chatHeader: {
    padding: "10px",
    backgroundColor: "#0084ff",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    justifyContent: "space-between",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  chatBox: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
  },
  userMessage: {
    backgroundColor: "#0084ff",
    color: "#fff",
    padding: "8px",
    borderRadius: "10px",
    marginBottom: "5px",
    alignSelf: "flex-end",
    maxWidth: "70%",
  },
  botMessage: {
    backgroundColor: "#e5e5ea",
    color: "#000",
    padding: "8px",
    borderRadius: "10px",
    marginBottom: "5px",
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "5px",
    outline: "none",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "8px 12px",
    backgroundColor: "#0084ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Chatbot;
