import React, { useState, useRef, useEffect } from "react";

const GEMINI_API_KEY = "YOUR_API_KEY"; // Replace with your actual key

const Innobot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptCount, setPromptCount] = useState(10);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || promptCount <= 0) return;

    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
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
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-white font-inter">
      {/* Beta Banner */}
      <div className="text-sm text-gray-300 bg-[#1a1a1a] text-center py-1">
        🧪 Beta Version – Help us improve. This is a test release.
      </div>

      {/* Header */}
      <header className="text-center text-xl text-blue-400 font-semibold py-3 border-b border-gray-800">
        🤖 Innobot – Your Robotics AI Assistant (Beta)
      </header>

      {/* Prompt Count */}
      <div className="text-center text-gray-400 text-sm mt-1 mb-1">
        Questions left: {promptCount}/10
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-2 rounded-xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-black self-end ml-auto"
                : "bg-[#1e1e1e] border border-gray-700 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 text-sm italic">Innobot is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="flex items-center border-t border-gray-800 bg-[#111] px-4 py-3">
        <textarea
          className="flex-1 p-3 rounded-md bg-[#1c1c1c] text-white resize-none focus:outline-none text-sm"
          rows={2}
          placeholder="Ask about Arduino, robotics, circuits..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="ml-3 px-4 py-2 rounded-md bg-blue-400 text-black font-bold hover:bg-blue-500 transition-all"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default Innobot;
