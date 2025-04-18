
// export default Chat;
import React, { useState, useEffect } from "react";
import "./Chat.css"; // Ensure you have this CSS file
import axios, { AxiosError } from "axios";
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = "/chat";

  // const handlePost = async () => {
  //   setLoading(true);
  //   setError(''); // Reset error before request

  //   try {
  //     const response = await axios.post(API_URL, {
  //       title: "New Post",
  //       body: "This is the content of the new post.",
  //       userId: 1,
  //     });
  //     const response = await axios.post(API_URL, requestData, {
  //       headers: {
  //         "Content-Type": "application/json", // Ensures the server knows it's receiving JSON
  //       },
  //     });
  //     setData(response.data);
  //     console.log("Success:", response.data);
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       // This ensures TypeScript knows err is an AxiosError
  //       if (err.response) {
  //         // Server responded with a status other than 2xx
  //         console.error("Server Error:", err.response.status, err.response.data);
  //         setError(`Error: ${err.response.status} - ${err.response.data?.message || "Something went wrong"}`);
  //       } else if (err.request) {
  //         // Request was made but no response received
  //         console.error("No Response from Server:", err.request);
  //         setError("No response from server. Please try again later.");
  //       } else {
  //         // Other Axios-related errors
  //         console.error("Error:", err.message);
  //         setError("An unexpected error occurred.");
  //       }
  //     } else {
  //       // Non-Axios errors (e.g., coding mistakes, network issues, etc.)
  //       console.error("Unexpected Error:", err);
  //       setError("An unexpected error occurred.");
  //     }
    
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessage: { text: string; sender: "user" } = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // No TypeScript error
  
    setInput(""); // Clear input field
  
    try {
      const response = await axios.post(API_URL, {
        user_id: "12345",
        message: newMessage.text, // Send the user message
        context: messages.map((msg) => msg.text), // Send previous messages as context
        session_id: "xyz",
      }, { headers: {
        "Content-Type": "application/json",
      },});
      console.log("Success:1", response.data);
      if (response.data.response=="") {
        console.log("Success:2", response.data);
        const botReply: { text: string; sender: "bot" } = { text:"Something went wrong", sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }
      else {
        const botReply: { text: string; sender: "bot" } = { text: response.data.response, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botReply]); // No TypeScript error
      }
     
    } catch (error) {
      console.log("Eroor:", error);
      console.error("API Error:", error);
      const errorMessage: { text: string; sender: "bot" } = { text: "Error fetching response.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };
  
  

  // Function to handle sending a message
  const sendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    // const newMessages = [...messages, { text: input, sender: "user" }];
    // setMessages(newMessages);
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    // setMessages([...messages, { text: 'Hello! How can I assist you?', sender: "bot" }]);
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Hello! How can I assist you?", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      {/* Chat Messages */}
      <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      </div>
    </div>
  );
};

export default Chat;

