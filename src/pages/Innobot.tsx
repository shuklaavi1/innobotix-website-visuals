
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA5W6cpU5fEqQbjp1Or0R6snHwIHwKrj2k`, {
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
    localStorage.removeItem('innobot-messages');
  };

  const remainingQuestions = Math.max(0, 5 - promptCount);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-['Space_Grotesk',sans-serif] flex flex-col">
      <Navigation />
      
      {/* Beta Banner - Sticky */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border-b border-orange-500/30 py-2 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-orange-300 text-sm font-medium animate-pulse">
            🧪 Beta Version – Help us improve. This is a test release.
          </span>
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center py-6 px-4 border-b border-gray-800/50">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-3 animate-fade-in">
          🤖 Innobot – Your Robotics AI Assistant (Beta)
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-4 animate-fade-in font-light">
          Ask me anything about Arduino, circuits, robotics, and more!
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm">
            Questions left: <span className="font-bold text-blue-400">{remainingQuestions}/5</span>
          </div>
          <button
            onClick={clearChat}
            className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 rounded-full px-4 py-2 text-sm transition-all"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6" style={{ paddingBottom: '120px' }}>
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex animate-fade-in ${message.isUser ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start space-x-3 max-w-[85%] md:max-w-[70%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30'
                  }`}>
                    {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl p-4 backdrop-blur-sm shadow-lg ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white border border-blue-400/30 shadow-blue-500/20' 
                      : 'bg-gray-800/90 text-gray-100 border border-gray-600/30 shadow-gray-900/30'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{message.text}</p>
                    <div className="text-xs opacity-60 mt-2 font-mono">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Animation */}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start space-x-3 max-w-[85%] md:max-w-[70%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-800/90 text-gray-100 border border-gray-600/30 rounded-2xl p-4 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-300">Thinking...</span>
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
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-gray-700/50 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          {promptCount >= 5 && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-xl text-center">
              <span className="text-red-300 text-sm">🚫 Free limit reached! You've used all 5 questions.</span>
            </div>
          )}
          <div className="flex space-x-3 items-end">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Arduino, robotics, circuits..."
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 resize-none h-14 backdrop-blur-sm rounded-2xl border-2 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                disabled={isLoading || promptCount >= 5}
                rows={1}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading || promptCount >= 5}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-2xl shadow-blue-500/30 px-6 py-3 rounded-2xl h-14 transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Ask Innobot
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Innobot;
