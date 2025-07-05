
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Innobot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Innobot, your robotics AI assistant. I'm here to help you with Arduino projects, circuit design, robotics questions, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Call Gemini 1.5 Flash API with correct endpoint
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA5W6cpU5fEqQbjp1Or0R6snHwIHwKrj2k`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Innobot, a helpful robotics AI assistant. Please answer this robotics/Arduino/circuit question in a friendly and educational way: ${inputText}`
            }]
          }]
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

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-['Space_Grotesk',sans-serif] flex flex-col">
      <Navigation />
      
      {/* Beta Banner - Sticky */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border-b border-orange-500/30 py-3 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-orange-300 text-sm font-medium animate-pulse">
            🧪 Beta Version – This is an early test release. Help us improve!
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className="text-center py-8 px-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            Innobot – Your Robotics AI Assistant
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fade-in font-light">
            Ask me anything about Arduino, circuits, robotics, and more!
          </p>
        </div>

        {/* Chat Window */}
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 pb-32">
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-blue-500/10 h-[500px] md:h-[600px] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex animate-fade-in ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`flex items-start space-x-4 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50'
                    }`}>
                      {message.isUser ? <User className="w-5 h-5" /> : <span className="text-white font-bold">AI</span>}
                    </div>
                    <div className={`rounded-2xl p-4 backdrop-blur-sm shadow-lg ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border border-blue-400/30 shadow-blue-500/20' 
                        : 'bg-gray-800/80 text-gray-100 border border-gray-600/30 shadow-gray-900/50'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      <div className="text-xs opacity-60 mt-2 font-mono">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading Animation */}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-start space-x-4 max-w-[85%]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div className="bg-gray-800/80 text-gray-100 border border-gray-600/30 rounded-2xl p-4 backdrop-blur-sm shadow-lg">
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
      </div>

      {/* Fixed Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-gray-700/50 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4 items-end">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Arduino, robotics, circuits..."
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 resize-none min-h-[60px] max-h-[120px] backdrop-blur-sm rounded-2xl border-2 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-2xl shadow-blue-500/50 px-8 py-4 rounded-2xl h-[60px] transition-all hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
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
