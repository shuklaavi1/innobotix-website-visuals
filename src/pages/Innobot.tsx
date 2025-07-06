import React, { useEffect, useRef, useState } from "react";
import "./Innobot.css";

const GEMINI_API_KEY = "YOUR_API_KEY"; // Replace with your real key

const Innobot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptCount, setPromptCount] = useState(10);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || promptCount <= 0) return;

    setMessages((prev) => [...prev, { role: "user", text: input.trim() }]);
    setInput("");
    setIsLoading(true);
    setPromptCount((prev) => prev - 1);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input.trim() }] }],
          }),
        }
      );
      const data = await res.json();
      const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ I couldn’t answer that.";
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "⚠️ API error. Try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="innobot-container">
      <div className="innobot-top-banner">🧪 Beta Version – Help us improve. This is a test release.</div>
      <div className="innobot-header">
        <img src="/logo.png" alt="Innobotix" className="innobot-logo" />
        <h1>🤖 Innobot – Your Robotics AI Assistant (Beta)</h1>
        <div className="prompt-count">Questions left: {promptCount}/10</div>
      </div>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="chat-bubble bot">⌛ Innobot is typing...</div>}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about Arduino, robotics, circuits..."
        />
        <button onClick={handleSend}>Ask</button>
      </div>
    </div>
  );
};

export default Innobot;
