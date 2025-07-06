
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
    <div className="min-h-screen bg-[#0d0d0d] text-white font-['Poppins',sans-serif] flex flex-col">
      <Navigation />
      
      {/* Beta Banner */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-500/30 py-2 text-center">
        <span className="text-amber-300 text-sm font-medium">
          🧪 Beta Version – Help us improve. This is a test release.
        </span>
      </div>

      {/* Header Section */}
      <div className="text-center py-6 px-4 border-b border-gray-800/50">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-3">
          🤖 Innobot – Your Robotics AI Assistant (Beta)
        </h1>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm">
            Questions left: <span className="font-bold text-blue-400">{remainingQuestions}/5</span>
          </div>
          <button
            onClick={clearChat}
            className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 rounded-full px-4 py-2 text-sm transition-all text-gray-300 hover:text-white"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-gray-800 border border-cyan-500/50'
                  }`}>
                    {message.isUser ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <img 
                        src="https://i.postimg.cc/9Qr20MFq/INNO-LOGO-FINAL.png" 
                        alt="Innobot"
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white' 
                      : 'bg-gray-800/90 text-gray-100 border border-gray-700/50'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border border-cyan-500/50">
                    <img 
                      src="https://i.postimg.cc/9Qr20MFq/INNO-LOGO-FINAL.png" 
                      alt="Innobot"
                      className="w-5 h-5 rounded-full"
                    />
                  </div>
                  <div className="bg-gray-800/90 text-gray-100 border border-gray-700/50 rounded-2xl p-4">
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

        {/* Input Area - Fixed at bottom */}
        <div className="border-t border-gray-800/50 p-4 bg-[#0d0d0d]/95 backdrop-blur-sm">
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
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 resize-none min-h-[50px] max-h-[50px] backdrop-blur-sm rounded-xl border-2 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  disabled={isLoading || promptCount >= 5}
                  rows={1}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading || promptCount >= 5}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-6 py-3 rounded-xl h-[50px] transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
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
      </div>

      <Footer />
    </div>
  );
};

export default Innobot;
