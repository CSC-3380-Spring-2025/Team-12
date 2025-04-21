import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import { FaComments, FaUserPlus, FaArrowUp, FaBars } from 'react-icons/fa';

type User = {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline";
};

type FriendRequest = {
  id: string;
  from: User;
  message?: string;
  timestamp: string;
};

type Message = {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
};

// Mock data
const mockFriends: User[] = [
  { id: "1", name: "Hannah Lowery", status: "online" },
  { id: "2", name: "Adam Brown", status: "offline" },
  { id: "3", name: "Truong Nguyen", status: "online" },
  { id: "4", name: "Benny Ly", status: "online" },
  { id: "5", name: "Layla Jones", status: "offline" },
];

const mockRequests: FriendRequest[] = [
  {
    id: "1",
    from: { id: "4", name: "Malachi", status: "online" },
    message: "Hey, let's connect!",
    timestamp: new Date().toISOString(),
  },
];

// Bot responses
const botResponses = [
  "That's interesting! Tell me more.",
  "skibidi...i guess",
  "Thanks for sharing that with me!",
  "I'm just a bot, so maybe ask your mom...idk.",
  "Cool! What else is on your mind?",
  "you yap a lot",
  "hehehe so funny :/",
  "I'll pretend I understood that perfectly.",
  "innterestingg",
  "I'm learning so much from our conversation!"
];

const getRandomResponse = () => {
  return botResponses[Math.floor(Math.random() * botResponses.length)];
};

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [showRequests, setShowRequests] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(mockRequests);
  const [friends, setFriends] = useState<User[]>(mockFriends);
  const [activeChat, setActiveChat] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Function to send a bot response
  const sendBotResponse = () => {
    if (!activeChat) return;
    
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        sender: activeChat,
        content: getRandomResponse(),
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleSendFriendRequest = () => {
    if (searchInput.trim()) {
      alert(`Friend request sent to ${searchInput}`);
      setSearchInput("");
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find((req) => req.id === requestId);
    if (request) {
      setFriends([...friends, request.from]);
      setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
    }
  };

  const handleRejectRequest = (requestId: string) => {
    setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
  };

  const startChat = (friend: User) => {
    setActiveChat(friend);
    setShowRequests(false);
    setMessages([
      {
        id: "1",
        sender: friend,
        content: `Hi there! This is ${friend.name}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: { id: "current-user", name: "You", status: "online" },
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Trigger bot response
    sendBotResponse();
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-left">
          <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
            <FaBars />
          </div>
          {showMenu && (
            <div className="dropdown-menu">
              <div 
                className="menu-item" 
                onClick={() => {
                  navigate("/");
                  setShowMenu(false);
                }}
              >
                Home
              </div>
              <div 
                className="menu-item"
                onClick={() => {
                  navigate("/game");
                  setShowMenu(false);
                }}
              >
                Game Page
              </div>
            </div>
          )}
        </div>
        <div className="chat-center">
          <h2 className="chat-title">
            Chat <FaComments style={{ marginRight: '0.5rem' }} />
          </h2>
        </div>
        <div className="chat-right">
          <div 
            className="friend-request-icon" 
            onClick={() => setShowRequests(!showRequests)}
          >
            <FaUserPlus />
            {friendRequests.length > 0 && (
              <span className="request-count">{friendRequests.length}</span>
            )}
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="sidebar left-sidebar">
          <div className="friends-list">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="friend-item"
                onClick={() => startChat(friend)}
              >
                <span className={`status ${friend.status}`}></span>
                <span className="friend-name">{friend.name}</span>
                {activeChat?.id === friend.id && (
                  <span className="active-indicator"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {showRequests && (
          <div className="requests-popup">
            <div className="requests-header">
              <h3>Add Friend</h3>
            </div>
            <div className="send-request">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter username"
              />
              <button
                className="send-request-btn"
                onClick={handleSendFriendRequest}
              >
                Send Request
              </button>
            </div>
            <div className="requests-list">
              <h3 className="requests-title">Friend Requests</h3>
              {friendRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <div className="request-info">
                    <span className="requester-name">{request.from.name}</span>
                    <p className="request-message">{request.message}</p>
                  </div>
                  <div className="request-actions">
                    <button
                      className="accept-btn"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeChat ? (
          <div className="chat-area">
            <div className="active-chat-header">
              <h3 className="active-chat-name">{activeChat.name}</h3>
              <span className={`status ${activeChat.status}`}></span>
            </div>
            <div className="messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender.id === "current-user" ? "sent" : "received"
                  }`}
                >
                  <p className="message-content">{msg.content}</p>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message"
              />
              <button className="send-message-btn" onClick={sendMessage}>
                <FaArrowUp className="send-arrow-icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-chat">
            <FaComments className="empty-chat-icon" />
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;