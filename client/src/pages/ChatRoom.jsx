import { useState } from "react";
import Navbar from "../components/Navbar";
// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    try {
      if (inputValue.trim()) {
        const newMessage = {
          text: inputValue,
          id: messages.length,
          role: "user",
        };
        setMessages([...messages, newMessage]);
        setInputValue("");

        const result = await model.generateContent(inputValue);
        console.log(result.response.text());
        const botAnswer = result.response.text();

        const botResponse = {
          text: botAnswer,
          id: messages.length + 1,
          role: "bot",
          name: "Bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 space-y-3 mt-[60px] py-24 max-w-7xl mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <span className="text-sm text-black-primary mb-1">
              {msg.role === "user" ? "You" : "Bot"}
            </span>

            <div
              className={`p-3 rounded-lg text-dark-brown ${
                msg.role === "user" ? "bg-[#d1c6b7]" : "bg-[#e7d8c9]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-light-brown max-w-7xl mx-auto w-full flex items-center">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          rows="1"
          className="w-full resize-none bg-background p-2 rounded-lg rounded-r-none border border-[#c3a89a] text-[#5d4a3f] focus:outline-none"
          style={{ overflow: "hidden" }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-dark-brown text-white py-2 px-4 h-full rounded-lg rounded-l-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
