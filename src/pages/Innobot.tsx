import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Innobot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history and prompt count from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('innobot-messages');
    const savedPromptCount = localStorage.getItem('innobot-prompt-count');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    } else {
      // Set initial welcome message if no saved messages
      const welcomeMessage: Message = {
        id: '1',
        text: "Hello! I'm Innobot, your robotics AI assistant. I'm here to help you with Arduino projects, circuit design, robotics questions, and more. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
    
    if (savedPromptCount) {
      setPromptCount(parseInt(savedPromptCount));
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('innobot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save prompt count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('innobot-prompt-count', promptCount.toString());
  }, [promptCount]);

  const typeWriter = (text: string, callback: (currentText: string) => void) => {
    let i = 0;
    const speed = 15; // typing speed in milliseconds
    
    const type = () => {
      if (i < text.length) {
        callback(text.substring(0, i + 1));
        i++;
        setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };
    
    setIsTyping(true);
    type();
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || promptCount >= 5) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    setPromptCount(prev => prev + 1);

    // Create a placeholder AI message for typing animation
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      text: "",
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_GEMINI_API_KEY`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Innobot, a concise and intelligent assistant helping students with robotics, Arduino, and electronics. Give clear and accurate answers. Question: ${inputText}`
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
      
      let aiResponse = "I'm having trouble processing your request right now. Please try again later.";
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        aiResponse = data.candidates[0].content.parts[0].text;
      }

      // Update the AI message with typing animation
      typeWriter(aiResponse, (currentText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: currentText }
              : msg
          )
        );
      });

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = "Sorry, I encountered an error. Please try again later.";
      
      typeWriter(errorMessage, (currentText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: currentText }
              : msg
          )
        );
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! I'm Innobot, your robotics AI assistant. I'm here to help you with Arduino projects, circuit design, robotics questions, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setPromptCount(0);
    localStorage.removeItem('innobot-messages');
    localStorage.removeItem('innobot-prompt-count');
  };

  const remainingQuestions = Math.max(0, 5 - promptCount);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-['Poppins',sans-serif] flex flex-col">
      
      <Navigation />
      
      {/* Beta Banner */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border-b border-orange-500/30 py-2 backdrop-blur-md animate-glow-pulse">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-orange-300 text-sm font-medium">
            🧪 Beta Version – Help us improve!
          </span>
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center py-8 px-4 border-b border-gray-800/50 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 animate-glow-text">
          🤖 Innobot – Your Robotics AI Assistant (Beta)
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6 font-light">
          Ask me anything about robotics, Arduino, circuits, and more!
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-full px-6 py-3 text-sm shadow-lg shadow-blue-500/30">
            <span className="text-blue-400 font-bold">Questions left: {remainingQuestions}/5</span>
          </div>
          <button
            onClick={clearChat}
            className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 rounded-full px-6 py-3 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar" style={{ paddingBottom: '150px' }}>
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex animate-slide-in ${message.isUser ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start space-x-4 max-w-[85%] md:max-w-[75%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-blue-500/50' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-blue-400 shadow-blue-500/30'
                  }`}>
                    {message.isUser ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div className={`rounded-2xl p-5 backdrop-blur-sm shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white border border-blue-400/30 shadow-blue-500/30' 
                      : 'bg-gradient-to-r from-gray-800/90 to-gray-900/90 text-gray-100 border border-gray-600/30 shadow-gray-900/50'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-base">{message.text}</p>
                    <div className="text-xs opacity-60 mt-3 font-mono">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Animation */}
            {isLoading && (
              <div className="flex justify-start animate-slide-in">
                <div className="flex items-start space-x-4 max-w-[85%] md:max-w-[75%]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-blue-400 shadow-lg shadow-blue-500/30">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 text-gray-100 border border-gray-600/30 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                      <span className="text-sm text-blue-400 font-medium">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Fixed Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-gray-700/50 p-6 z-50">
        <div className="max-w-5xl mx-auto">
          {promptCount >= 5 && (
            <div className="mb-4 p-4 bg-red-600/20 border border-red-500/30 rounded-2xl text-center animate-pulse">
              <span className="text-red-300 text-sm font-medium">🚫 Free limit reached! You've used all 5 questions.</span>
            </div>
          )}
          <div className="flex space-x-4 items-end">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about robotics, Arduino, circuits..."
                className="w-full bg-gray-800/50 border-2 border-gray-600/50 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 resize-none rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/20"
                disabled={isLoading || promptCount >= 5}
                rows={1}
                style={{ minHeight: '60px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading || promptCount >= 5}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-2xl shadow-blue-500/40 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center space-x-2 font-semibold text-lg"
              style={{ minHeight: '60px' }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Ask Innobot</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Innobot;
