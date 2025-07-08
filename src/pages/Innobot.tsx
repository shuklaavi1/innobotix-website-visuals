import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Send, User, Bot, Loader2, Zap, Brain, Code, Cpu, Sparkles, Star, ArrowRight, MessageCircle, Users, TrendingUp, Mail, Shield, Globe, Rocket, ChevronDown, Play, Copy, Check } from "lucide-react";

// Types
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  emailSent?: boolean;
}

interface AICapability {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  examples: string[];
}

const Innobot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const aiCapabilities: AICapability[] = [
    {
      icon: <Code className="w-7 h-7" />,
      title: "Code Generation",
      description: "Generate optimized Arduino, Python, and C++ code with best practices",
      metric: "99.2% accuracy",
      examples: ["Arduino sensor arrays", "Motor control systems", "IoT protocols"]
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: "Circuit Analysis",
      description: "Design and debug electronic circuits with professional insights",
      metric: "10K+ designs",
      examples: ["PCB optimization", "Signal integrity", "Power management"]
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "AI Robotics",
      description: "Advanced algorithms for autonomous systems and machine learning",
      metric: "Sub-10ms response",
      examples: ["Computer vision", "Path planning", "Neural networks"]
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      title: "Project Scaling",
      description: "Enterprise-grade architecture and deployment strategies",
      metric: "Production ready",
      examples: ["System architecture", "Performance optimization", "DevOps"]
    }
  ];

  // Load saved data
  useEffect(() => {
    const savedMessages = localStorage.getItem('innobot-messages');
    const savedPromptCount = localStorage.getItem('innobot-prompt-count');
    const savedEmail = localStorage.getItem('innobot-email');
    
    if (savedEmail) {
      setUserEmail(savedEmail);
      setEmailConfirmed(true);
    }
    
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
      const welcomeMessage: Message = {
        id: '1',
        text: "👋 Welcome to Innobot Enterprise! I'm your advanced AI assistant built for the next generation of robotics engineers. Ready to build something extraordinary?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
    
    if (savedPromptCount) {
      setPromptCount(parseInt(savedPromptCount));
    }
  }, []);

  // Auto-scroll and save
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('innobot-messages', JSON.stringify(messages));
    }
    localStorage.setItem('innobot-prompt-count', promptCount.toString());
  }, [messages, promptCount]);

  const saveEmail = () => {
    if (userEmail && userEmail.includes('@')) {
      localStorage.setItem('innobot-email', userEmail);
      setEmailConfirmed(true);
      setShowEmailModal(false);
    }
  };

  const sendEmailNotification = async (userQuestion: string, aiResponse: string) => {
    if (!emailConfirmed || !userEmail) return;

    try {
      // In a real implementation, you'd call your backend API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Innobot Response - Your Robotics Question',
          question: userQuestion,
          answer: aiResponse,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error('Email sending failed:', error);
    }
    return false;
  };

  const typeWriter = (text: string, callback: (currentText: string) => void) => {
    let i = 0;
    const speed = 8; // Faster typing for premium feel
    
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
    if (!inputText.trim() || isLoading || promptCount >= 10) return;

    setShowCapabilities(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);
    setPromptCount(prev => prev + 1);

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
              text: `You are Innobot Enterprise, an elite AI assistant for professional robotics engineers and startup founders. Provide expert-level, detailed responses with code examples when applicable. Be professional yet innovative. Question: ${currentInput}`
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
      
      let aiResponse = "I'm experiencing technical difficulties. Our engineering team has been notified.";
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        aiResponse = data.candidates[0].content.parts[0].text;
      }

      typeWriter(aiResponse, (currentText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: currentText }
              : msg
          )
        );
      });

      // Send email notification
      if (emailConfirmed) {
        const emailSent = await sendEmailNotification(currentInput, aiResponse);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, emailSent }
              : msg
          )
        );
      }

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = "I apologize for the technical issue. Our team is working on a fix.";
      
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
      text: "👋 Welcome to Innobot Enterprise! I'm your advanced AI assistant built for the next generation of robotics engineers. Ready to build something extraordinary?",
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const remainingQuestions = Math.max(0, 10 - promptCount);

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',sans-serif] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-black to-cyan-900/10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <Navigation />
      
      {/* Status Bar */}
      <div className="sticky top-16 z-40 bg-black/50 backdrop-blur-xl border-b border-white/5 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-xs font-medium">Production Ready</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/60 text-xs">
              <Globe className="w-3 h-3" />
              <span>99.9% Uptime</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {emailConfirmed ? (
              <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
                <Mail className="w-3 h-3 text-violet-400" />
                <span className="text-violet-400 text-xs font-medium">Email Active</span>
              </div>
            ) : (
              <button
                onClick={() => setShowEmailModal(true)}
                className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 hover:bg-amber-500/20 transition-all"
              >
                <Mail className="w-3 h-3 text-amber-400" />
                <span className="text-amber-400 text-xs font-medium">Setup Email</span>
              </button>
            )}
            
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <span className="font-mono">{remainingQuestions}/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-16 px-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm font-medium">Trusted by 10,000+ Engineers</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tight">
            <span className="block text-white">Innobot</span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Enterprise
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            The AI assistant that scales with your robotics startup. From prototype to production.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { value: "99.9%", label: "Model Accuracy" },
              { value: "<50ms", label: "Response Time" },
              { value: "24/7", label: "Availability" },
              { value: "Enterprise", label: "Security" }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-white/60">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 rounded-2xl px-6 py-3 backdrop-blur-sm">
              <span className="text-violet-400 font-semibold text-lg">
                {remainingQuestions} questions remaining
              </span>
            </div>
            <button
              onClick={clearChat}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-3 transition-all duration-300 hover:scale-105"
            >
              <span className="text-white/80">New Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* AI Capabilities */}
        {showCapabilities && messages.length <= 1 && (
          <div className="px-4 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Enterprise AI Capabilities
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                  Production-grade AI assistance for professional robotics development
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {aiCapabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-violet-500/30"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-2xl border border-violet-500/30 group-hover:border-violet-400/50 transition-all">
                        {capability.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{capability.title}</h3>
                        <div className="text-violet-400 text-sm font-mono">{capability.metric}</div>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">{capability.description}</p>
                    
                    <div className="space-y-2">
                      {capability.examples.map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickStart(`Help me with ${example.toLowerCase()}`)}
                          className="block w-full text-left text-xs text-violet-400 hover:text-violet-300 transition-colors border-l-2 border-violet-500/30 pl-3 py-1 hover:border-violet-400/50 hover:pl-4 transition-all"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Play className="w-5 h-5 text-cyan-400" />
                  Quick Start Templates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Design a motor control system for robotic arm",
                    "Implement PID controller for drone stabilization",
                    "Create IoT sensor network architecture",
                    "Optimize power consumption for mobile robot"
                  ].map((template, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickStart(template)}
                      className="text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-200 hover:border-cyan-400/50 group"
                    >
                      <span className="text-white/90 group-hover:text-cyan-300">{template}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar" style={{ paddingBottom: '180px' }}>
          <div className="max-w-5xl mx-auto space-y-8">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex animate-slide-in ${message.isUser ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start space-x-4 max-w-[85%] md:max-w-[75%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg backdrop-blur-sm ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600 border border-violet-400/30' 
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-400/30'
                  }`}>
                    {message.isUser ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  
                  <div className={`relative rounded-3xl p-6 backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-[1.02] border ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-violet-500/20 to-purple-600/20 border-violet-400/30' 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-base text-white/90">{message.text}</p>
                    
                    <div className="flex items-center justify-between mt-4 text-xs text-white/50">
                      <span className="font-mono">{message.timestamp.toLocaleTimeString()}</span>
                      
                      <div className="flex items-center gap-2">
                        {!message.isUser && message.text && (
                          <button
                            onClick={() => copyToClipboard(message.text)}
                            className="flex items-center gap-1 hover:text-white/70 transition-colors"
                          >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </button>
                        )}
                        
                        {!message.isUser && message.emailSent && (
                          <div className="flex items-center gap-1 text-emerald-400">
                            <Mail className="w-3 h-3" />
                            <span>Sent</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-slide-in">
                <div className="flex items-start space-x-4 max-w-[85%] md:max-w-[75%]">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-400/30 backdrop-blur-sm">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="typing-dot bg-gradient-to-r from-violet-400 to-cyan-400"></div>
                        <div className="typing-dot bg-gradient-to-r from-violet-400 to-cyan-400"></div>
                        <div className="typing-dot bg-gradient-to-r from-violet-400 to-cyan-400"></div>
                      </div>
                      <span className="text-sm text-violet-400 font-medium flex items-center gap-2">
                        <Brain className="w-4 h-4 animate-pulse" />
                        Processing with enterprise AI...
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
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/10 p-6 z-50">
        <div className="max-w-5xl mx-auto">
          {promptCount >= 10 && (
            <div className="mb-4 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-red-300 text-lg font-semibold">Rate Limit Reached</span>
              </div>
              <p className="text-red-200 text-sm">Contact us for enterprise access with unlimited queries.</p>
            </div>
          )}
          
          <div className="flex space-x-4 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about robotics, AI, circuits, or system architecture..."
                className="w-full bg-white/5 border-2 border-white/20 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-white/40 resize-none rounded-2xl p-4 pr-12 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-violet-500/20"
                disabled={isLoading || promptCount >= 10}
                rows={1}
                style={{ minHeight: '64px', maxHeight: '150px' }}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <div className="text-xs text-white/40 font-mono">
                  {inputText.length}/1000
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading || promptCount >= 10}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-2xl shadow-violet-500/40 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center space-x-3 font-semibold text-lg min-h-[64px] border border-violet-400/30"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
          
          {/* Enhanced Footer */}
          <div className="flex items-center justify-between mt-4 text-sm text-white/40">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Powered by Gemini Pro
              </span>
              <span className="hidden md:inline">Press Enter to send, Shift+Enter for new line</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Enterprise AI Online</span>
              </div>
              {emailConfirmed && (
                <div className="flex items-center gap-1 text-violet-400">
                  <Mail className="w-3 h-3" />
                  <span>Email Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email Setup Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Setup Email Notifications</h3>
            <p className="text-white/70 mb-6">Get AI responses delivered directly to your Gmail.</p>
            
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your@gmail.com"
              className="w-full bg-white/5 border border-white/20 rounded-xl p-3 text-white placeholder-white/40 mb-6 focus:border-violet-400/50 focus:outline-none"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 bg-white/5 border border-white/20 rounded-xl p-3 text-white hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveEmail}
                className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-3 text-white hover:from-violet-700 hover:to-purple-700 transition-all"
              >
                Save Email
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Innobot;
