import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import { FaComments } from 'react-icons/fa';

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
  { id: "1", name: "Alex Johnson", status: "online" },
  { id: "2", name: "Sam Wilson", status: "offline" },
  { id: "3", name: "Taylor Swift", status: "online" },
];

const mockRequests: FriendRequest[] = [
  {
    id: "1",
    from: { id: "4", name: "Morgan Taylor", status: "online" },
    message: "Hey, let's connect!",
    timestamp: new Date().toISOString(),
  },
];

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "chat">(
    "friends"
  );
  const [friendRequests, setFriendRequests] =
    useState<FriendRequest[]>(mockRequests);
  const [friends, setFriends] = useState<User[]>(mockFriends);
  const [activeChat, setActiveChat] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");

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
    setActiveTab("chat");
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
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-left">
          <span className="home-text" onClick={() => navigate("/")}>
            Home
          </span>
        </div>
        <div className="chat-center">
          <h2 className="chat-title">
            Chat <FaComments style={{ marginRight: '0.5rem' }} />
          </h2>
        </div>
        <div className="chat-right"></div>{" "}
        {/* Left some space to add more if need/want to */}
      </div>

      <div className="chat-container">
        <div className="sidebar left-sidebar">
          <div className="tabs">
            <button
              className={activeTab === "friends" ? "active" : ""}
              onClick={() => setActiveTab("friends")}
            >
              Friends
            </button>
            <button
              className={activeTab === "requests" ? "active" : ""}
              onClick={() => setActiveTab("requests")}
            >
              Requests ({friendRequests.length})
            </button>
          </div>

          {activeTab === "friends" && (
            <div className="friends-list">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="friend-item"
                  onClick={() => startChat(friend)}
                >
                  <span className={`status ${friend.status}`}></span>
                  <span className="friend-name">{friend.name}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "requests" && (
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
            </div>
          )}
        </div>

        {activeTab === "chat" && activeChat && (
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
                placeholder="Type a message..."
              />
              <button className="send-message-btn" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
