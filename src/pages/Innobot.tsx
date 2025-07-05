
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Loader2 } from "lucide-react";

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
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load question count from localStorage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem('innobotQuestionCount');
    if (savedCount) {
      setQuestionCount(parseInt(savedCount, 10));
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // Check question limit
    if (questionCount >= 5) {
      alert("🚫 Free limit reached! Sign in to continue.");
      return;
    }

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
      // Call Gemini Pro API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA5W6cpU5fEqQbjp1Or0R6snHwIHwKrj2k`, {
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

      const data = await response.json();
      
      let aiResponse = "I'm having trouble processing your request right now. Please try again later.";
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        aiResponse = data.candidates[0].content.parts[0].text;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Increment and save question count
      const newCount = questionCount + 1;
      setQuestionCount(newCount);
      localStorage.setItem('innobotQuestionCount', newCount.toString());

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

  const isAtLimit = questionCount >= 5;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navigation />
      
      {/* Beta Banner */}
      <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border-b border-orange-500/30 py-2">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-orange-300 text-sm font-medium">
            🧪 Beta Version – This is an early test release. Help us improve!
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-200px)] flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            🤖 Innobot – Your Robotics AI Assistant (Beta)
          </h1>
          <p className="text-gray-400">
            Ask me anything about Arduino, circuits, robotics, and more!
          </p>
          <div className="mt-2 text-sm text-cyan-400">
            Questions remaining: {5 - questionCount}/5
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-gray-900/50 rounded-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser 
                      ? 'bg-blue-600' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  }`}>
                    {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700/50">
            {isAtLimit ? (
              <div className="text-center py-4">
                <p className="text-red-400 mb-4">🚫 Free limit reached! Sign in to continue.</p>
                <Button disabled className="bg-gray-600 cursor-not-allowed">
                  Ask Innobot
                </Button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Arduino, circuits, robotics..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none min-h-[50px] max-h-[120px]"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 px-6"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Ask Innobot
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Innobot;
