import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed
import "./evaluate.css";

const Evaluate = () => {
  const [theme, setTheme] = useState("light");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Greetings, how was your day?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const navigate = useNavigate();

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Handle user input submission
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    // Add the user's message to the chat
    setMessages([...messages, { sender: "user", text: userInput }]);
    setUserInput(""); // Clear the input field
  };

  return (
    <div className={`evaluate-container ${theme}`}>
      {/* Top bar */}
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate("/menu")}>
          🔙
        </button>
        <div className="top-bar-title">StressGuru</div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Chat window */}
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="text-input"
        />
        <button className="send-button" onClick={handleSendMessage}>
          ▶️
        </button>
      </div>
    </div>
  );
};

export default Evaluate;
