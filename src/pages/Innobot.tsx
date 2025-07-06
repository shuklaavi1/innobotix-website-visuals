import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

// Types
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface InnobotProps {
  apiKey?: string;
  maxQuestions?: number;
  className?: string;
}

const Innobot: React.FC<InnobotProps> = ({ 
  apiKey = 'AIzaSyA5W6cpU5fEqQbjp1Or0R6snHwIHwKrj2k', 
  maxQuestions = 10,
  className = ''
}) => {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  // Refs
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Clear localStorage on mount (as requested)
  useEffect(() => {
    localStorage.removeItem('innobot-messages');
    localStorage.removeItem('innobot-question-count');
  }, []);

  // Load from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('innobot-messages');
    const savedQuestionCount = localStorage.getItem('innobot-question-count');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
        setShowWelcome(parsedMessages.length === 0);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
    
    if (savedQuestionCount) {
      setQuestionCount(parseInt(savedQuestionCount));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('innobot-messages', JSON.stringify(messages));
    }
    localStorage.setItem('innobot-question-count', questionCount.toString());
  }, [messages, questionCount]);

  // Scroll to bottom
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle input resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Set suggestion
  const setSuggestion = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  // Typing animation effect
  const typeWriterEffect = (text: string, onUpdate: (text: string) => void): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          onUpdate(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, 20);
    });
  };

  // Call Gemini API
  const callGeminiAPI = async (text: string): Promise<string> => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are Innobot, an expert AI assistant specializing in robotics, Arduino, electronics, and engineering. Provide clear, concise, and helpful answers. Use technical accuracy while keeping explanations accessible to students and makers.

User question: ${text}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "I'm having trouble processing your request right now. Please try again.";
  };

  // Send message
  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading || questionCount >= maxQuestions) return;

    setShowWelcome(false);

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setQuestionCount(prev => prev + 1);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);
    
    try {
      const response = await callGeminiAPI(text);
      setIsTyping(false);
      
      // Add AI response with typing effect
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: '',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Simulate typing effect
      await typeWriterEffect(response, (partialText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessage.id 
              ? { ...msg, text: partialText }
              : msg
          )
        );
      });
      
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now. Please check your API key and try again.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsLoading(false);
  };

  const remainingQuestions = Math.max(0, maxQuestions - questionCount);
  const isLimitReached = questionCount >= maxQuestions;

  return (
    <>
      <Helmet>
        <title>Innobot - AI Robotics Assistant | Innobotix</title>
        <meta name="description" content="Chat with Innobot, your AI-powered robotics assistant. Get expert help with Arduino, circuits, sensors, and robotics projects." />
        <meta name="keywords" content="robotics AI, chatbot, Arduino help, robotics assistant, electronics help, Innobotix bot" />
      </Helmet>

      <div className={`min-h-screen flex flex-col bg-[#0d0d0d] text-white font-['Inter'] ${className}`}>
        <Navigation />
        
        {/* Chat Header */}
        <div className="bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/10 p-4 text-center">
          <div 
            className="text-2xl font-semibold bg-gradient-to-r from-[#00ff88] via-[#00b4ff] to-[#8000ff] bg-clip-text text-transparent"
            style={{
              animation: 'glow-text 3s ease-in-out infinite alternate',
              textShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
            }}
          >
            🤖 Innobot – Your Robotics AI Assistant (Beta)
          </div>
          <div className="flex justify-center mt-2">
            <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 px-4 py-2 rounded-full text-sm text-[#00ff88] font-medium shadow-lg shadow-[#00ff88]/20">
              Questions left: {remainingQuestions}/{maxQuestions}
            </div>
          </div>
        </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          ref={chatMessagesRef}
          className="flex-1 overflow-y-auto p-8 pb-32 max-w-4xl mx-auto w-full scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-gradient-to-r scrollbar-thumb-from-[#00ff88] scrollbar-thumb-to-[#00b4ff] max-md:p-4 max-md:pb-36"
        >
          {/* Welcome Message */}
          {showWelcome && (
            <div className="text-center py-12 px-8 opacity-80 max-md:py-8 max-md:px-4">
              <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-[#00ff88] to-[#00b4ff] bg-clip-text text-transparent">
                Welcome to Innobot!
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Your AI assistant for robotics, Arduino, and electronics. Ask me anything!
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-8 max-md:flex-col max-md:items-center">
                {[
                  'How do I program an Arduino Uno?',
                  'Explain how servo motors work',
                  'Help me design a robot sensor system'
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setSuggestion(suggestion)}
                    className="bg-[#1a1a1a]/60 border border-white/10 rounded-xl px-6 py-4 cursor-pointer transition-all duration-300 text-sm text-gray-200 hover:bg-[#00ff88]/10 hover:border-[#00ff88]/30 hover:transform hover:-translate-y-1 max-md:w-full max-md:max-w-xs max-md:text-center"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-8 animate-[slideIn_0.5s_ease-out] ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`max-w-[75%] flex items-start gap-3 ${
                message.isUser ? 'flex-row-reverse' : 'flex-row'
              } max-md:max-w-[90%]`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0 mt-1 ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-[#00b4ff] to-[#0099ff] shadow-lg shadow-[#00b4ff]/40' 
                    : 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#00ff88] shadow-lg shadow-[#00ff88]/30'
                } max-md:w-7 max-md:h-7 max-md:text-sm`}>
                  {message.isUser ? '👤' : (
                    <img 
                      src="https://i.postimg.cc/CMNN97jZ/INNO-LOGO-FINAL.png" 
                      alt="Innobot"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl px-5 py-4 backdrop-blur-xl transition-all duration-300 text-base leading-relaxed ${
                  message.isUser
                    ? 'bg-gradient-to-br from-[#00b4ff]/90 to-[#0099ff]/95 border border-[#00b4ff]/40 shadow-lg shadow-[#00b4ff]/30 text-white'
                    : 'bg-[#1a1a1a]/80 border border-white/10 shadow-lg shadow-black/30 text-gray-200'
                } max-md:px-4 max-md:py-3 max-md:text-sm`}>
                  <div className="whitespace-pre-wrap break-words">
                    {message.text}
                  </div>
                  <div className="text-xs opacity-60 mt-2 font-mono">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start mb-8">
              <div className="ml-12 max-w-[75%] flex items-center gap-3 px-5 py-4 bg-[#1a1a1a]/80 border border-[#00ff88]/20 rounded-2xl animate-pulse max-md:ml-10 max-md:max-w-[90%]">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </div>
                <div className="text-[#00ff88] text-sm font-medium">
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-white/10 p-6 max-md:p-4">
        {/* Limit Warning */}
        {isLimitReached && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-center mb-4 text-sm animate-[shake_0.5s_ease-in-out] max-w-4xl mx-auto">
            🚫 Free limit reached! You've used all {maxQuestions} questions.
          </div>
        )}

        <div className="flex gap-4 max-w-4xl mx-auto items-end max-md:flex-col max-md:gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Ask about robotics, Arduino, circuits, sensors..."
              rows={1}
              disabled={isLimitReached}
              className="w-full bg-[#1a1a1a]/80 border-2 border-white/10 rounded-xl px-5 py-4 text-white text-base font-['Inter'] resize-none min-h-[52px] max-h-[120px] transition-all duration-300 backdrop-blur-xl focus:outline-none focus:border-[#00ff88] focus:shadow-lg focus:shadow-[#00ff88]/30 disabled:opacity-50 placeholder:text-gray-500"
              style={{ height: 'auto' }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={isLimitReached || isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-[#00ff88] to-[#00b4ff] text-black px-6 py-4 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 min-h-[52px] flex items-center gap-2 shadow-lg shadow-[#00ff88]/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00ff88]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none max-md:w-full max-md:justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Send</span>
                <span>↗</span>
              </>
            )}
          </button>
        </div>
      </div>

        {/* Custom Styles */}
        <style>
          {`
            @keyframes glow-text {
              0% { text-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
              100% { text-shadow: 0 0 30px rgba(0, 255, 136, 0.6); }
            }
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes shake {
              0% { transform: translateX(0); }
              25% { transform: translateX(-5px); }
              75% { transform: translateX(5px); }
              100% { transform: translateX(0); }
            }
          `}
        </style>
        
        <Footer />
      </div>
    </>
  );
};

export default Innobot;
