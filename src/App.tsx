

// export default App;
import React, { useState } from "react";
import "./App.css"; // CSS file for styling
import Chat from "./Chat";
function App() {
  // Sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  // Chat messages and user input
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState<string>("");

  // Toggle Sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Send message
  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // sendbotMessage()
    }
  };
  // const sendbotMessage = () => {
  //   if (input.trim() !== "") {
  //     setMessages([...messages, { text: input, sender: "bot" }]);
  //     setInput("");
  //   }
  // };

  return (
    <div className="app">
      {/* Header with Sidebar Toggle Box */}
      <header className="header">
        <div className="menu-box" onClick={toggleSidebar}>☰</div>
        <h1>Education Assistant</h1>
        <div className="user-info">👤 User</div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <h2>Previous Chats</h2>
        <ul>
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Chat 3</li>
        </ul>
      </div>

      {/* Chat Section */}
      {/* <div className="chat-container">
        <div className="chatbox">
       
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
        </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div> */}
      
      <Chat />
    </div>
    // </div>
  );
}


export default App;
