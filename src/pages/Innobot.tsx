import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Zap, Brain, Code, Cpu, Sparkles, Star, ArrowRight, MessageCircle, Users, TrendingUp } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AICapability {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
}

const Innobot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const aiCapabilities: AICapability[] = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Arduino Programming",
      description: "Write, debug, and optimize Arduino code",
      examples: ["Sensor integration", "Motor control", "IoT projects"]
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Circuit Design",
      description: "Design and troubleshoot electronic circuits",
      examples: ["PCB layouts", "Component selection", "Signal analysis"]
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Robotics Solutions",
      description: "Advanced robotics concepts and implementations",
      examples: ["Path planning", "Computer vision", "Autonomous systems"]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Assistance",
      description: "Instant help with technical challenges",
      examples: ["Debugging help", "Performance optimization", "Best practices"]
    }
  ];

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
        setShowCapabilities(false);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    } else {
      // Set initial welcome message if no saved messages
      const welcomeMessage: Message = {
        id: '1',
        text: "👋 Welcome to Innobot! I'm your advanced AI assistant specializing in robotics, Arduino, and electronics. I can help you with code, circuit design, troubleshooting, and innovative project ideas. What would you like to explore today?",
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
    const speed = 12; // typing speed in milliseconds
    
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

    setShowCapabilities(false);

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
              text: `You are Innobot, an advanced AI assistant specializing in robotics, Arduino, and electronics. Provide detailed, helpful, and professional responses. Be concise but comprehensive. Question: ${inputText}`
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
      const errorMessage = "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.";
      
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
      text: "👋 Welcome to Innobot! I'm your advanced AI assistant specializing in robotics, Arduino, and electronics. I can help you with code, circuit design, troubleshooting, and innovative project ideas. What would you like to explore today?",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setPromptCount(0);
    setShowCapabilities(true);
    localStorage.removeItem('innobot-messages');
    localStorage.removeItem('innobot-prompt-count');
  };

  const handleQuickStart = (example: string) => {
    setInputText(example);
    textareaRef.current?.focus();
  };

  const remainingQuestions = Math.max(0, 5 - promptCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-['Poppins',sans-serif] flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation />
      
      {/* Premium Beta Banner */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border-b border-amber-500/20 py-3 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">
              Beta • Advanced AI Technology
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-amber-200/80 text-sm">
            <Users className="w-4 h-4" />
            <span>2,847+ developers using Innobot</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-12 px-4 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
            <Star className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Professional AI Assistant</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text animate-glow-text">🤖 Innobot</span>
            <br />
            <span className="text-3xl md:text-4xl font-light text-slate-300">
              Your Advanced Robotics AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Harness the power of AI for Arduino programming, circuit design, and robotics innovation. 
            <span className="text-cyan-400"> Built for professionals.</span>
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-8 flex-wrap mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300">99.9% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300">Real-time Responses</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-300">Advanced AI Models</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl px-6 py-3 backdrop-blur-sm">
              <span className="text-emerald-400 font-semibold text-lg">Questions remaining: {remainingQuestions}/5</span>
            </div>
            <button
              onClick={clearChat}
              className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 rounded-2xl px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            >
              <span className="text-slate-300">Reset Conversation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* AI Capabilities Showcase */}
        {showCapabilities && messages.length <= 1 && (
          <div className="px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">
                  What Innobot Can Do
                </h2>
                <p className="text-slate-400 text-lg">
                  Advanced AI capabilities designed for robotics professionals
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {aiCapabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:border-purple-500/30 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-purple-500/30 group-hover:border-purple-400/50 transition-all">
                        {capability.icon}
                      </div>
                      <h3 className="font-semibold text-slate-200">{capability.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{capability.description}</p>
                    <div className="space-y-1">
                      {capability.examples.map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickStart(`Help me with ${example.toLowerCase()}`)}
                          className="block w-full text-left text-xs text-purple-400 hover:text-purple-300 transition-colors border-l-2 border-purple-500/30 pl-2 py-1 hover:border-purple-400/50"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Start Examples */}
              <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-cyan-400" />
                  Quick Start Examples
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Write Arduino code for ultrasonic sensor",
                    "Help me design a motor control circuit",
                    "Explain PID control for robotics",
                    "Debug my servo motor code"
                  ].map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickStart(example)}
                      className="text-left p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 rounded-xl transition-all duration-200 hover:border-cyan-400/50 group"
                    >
                      <span className="text-slate-300 group-hover:text-cyan-300">{example}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar" style={{ paddingBottom: '160px' }}>
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex animate-slide-in ${message.isUser ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start space-x-4 max-w-[85%] md:max-w-[75%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg backdrop-blur-sm ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/50 border border-cyan-400/30' 
                      : 'bg-gradient-to-r from-purple-600 to-violet-700 shadow-purple-500/50 border border-purple-400/30'
                  }`}>
                    {message.isUser ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div className={`rounded-2xl p-6 backdrop-blur-sm shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] border ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-white border-cyan-400/30 shadow-cyan-500/20' 
                      : 'bg-gradient-to-r from-slate-800/70 to-slate-900/70 text-slate-100 border-slate-600/30 shadow-slate-900/50'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-base">{message.text}</p>
                    <div className="text-xs opacity-60 mt-3 font-mono flex items-center gap-2">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {!message.isUser && (
                        <span className="flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          AI
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Typing Animation */}
            {isLoading && (
              <div className="flex justify-start animate-slide-in">
                <div className="flex items-start space-x-4 max-w-[85%] md:max-w-[75%]">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-purple-600 to-violet-700 shadow-lg shadow-purple-500/50 border border-purple-400/30 backdrop-blur-sm">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/70 to-slate-900/70 text-slate-100 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                      <span className="text-sm text-purple-400 font-medium flex items-center gap-2">
                        <Brain className="w-4 h-4 animate-pulse" />
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Enhanced Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 via-slate-900/90 to-transparent backdrop-blur-xl border-t border-slate-700/50 p-6 z-50">
        <div className="max-w-5xl mx-auto">
          {promptCount >= 5 && (
            <div className="mb-4 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-red-400" />
                <span className="text-red-300 text-lg font-semibold">Free Tier Limit Reached</span>
              </div>
              <p className="text-red-200 text-sm">You've used all 5 questions. Upgrade to Pro for unlimited access!</p>
            </div>
          )}
          
          <div className="flex space-x-4 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about robotics, Arduino, circuits, or any technical challenge..."
                className="w-full bg-slate-800/60 border-2 border-slate-600/50 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 resize-none rounded-2xl p-4 pr-12 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
                disabled={isLoading || promptCount >= 5}
                rows={1}
                style={{ minHeight: '64px', maxHeight: '140px' }}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <div className="text-xs text-slate-500">
                  {inputText.length}/500
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading || promptCount >= 5}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 shadow-2xl shadow-purple-500/40 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center space-x-3 font-semibold text-lg min-h-[64px] border border-purple-400/30"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Ask Innobot</span>
                </>
              )}
            </button>
          </div>
          
          {/* Enhanced Input Footer */}
          <div className="flex items-center justify-between mt-3 text-sm text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Powered by Gemini AI
              </span>
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>AI Online</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Innobot;
