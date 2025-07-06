import React, { useState } from 'react';

const InnobotSimple: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 text-center">
        <h1 className="text-2xl text-green-400">🤖 Innobot Test</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p>Test component is working!</p>
            <p>Send a message to see it appear here.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-700 rounded">
              {msg}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a test message..."
            className="flex-1 p-2 bg-gray-700 text-white rounded"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InnobotSimple;