import React, { useState } from "react";
import './Chat.css';  // Make sure to update styles if needed

interface Message {
  text: string;
  timestamp: string;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;  // Function passed from parent to close the chat modal
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if the modal isn't open

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");  // New message input field

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString(); // Get current time as timestamp
      const newMessageObj = {
        text: newMessage,
        timestamp,
      };
      setMessages([...messages, newMessageObj]); // Add the new message to the list of messages
      setNewMessage("");  // Clear the input field
    }
  };

  return (
    <div className="chat-modal">
      <div className="chat-content">
        {/* Close button - Red X icon inside the chat window */}
        <span className="close-x" onClick={onClose}>&times;</span>

        {/* Welcome message */}
        <div className="chat-welcome-message">
          <p>Welcome to the Ghosttown Guessr chat! Feel free to send a message.</p>
        </div>

        {/* Scrollable window for messages */}
        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={index} className="chat-message">
              <span className="message-timestamp">{message.timestamp}</span>
              <p className="message-text">{message.text}</p>
            </div>
          ))}
        </div>

        {/* Message input field and send button */}
        <div className="chat-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}  // Update input value
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="chat-send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;