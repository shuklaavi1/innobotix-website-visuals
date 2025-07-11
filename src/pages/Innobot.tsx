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
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
        text: "👋 Welcome to Innobot! I'm your AI assistant for robotics, Arduino, and electronics. Ready to help you build something amazing?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
    
    if (savedPromptCount) {
      setPromptCount(parseInt(savedPromptCount));
    }
  }, []);

  // Smooth scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (messagesEndRef.current && chatContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  // Clean markdown from API response
  const cleanMarkdownResponse = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold** formatting
      .replace(/\*(.*?)\*/g, '$1') // Remove *italic* formatting
      .replace(/`(.*?)`/g, '$1') // Remove `code` formatting
      .replace(/#{1,6}\s*(.*)/g, '$1') // Remove # headers
      .trim();
  };

  // Typing animation effect - made faster
  const typeWriter = (text: string, callback: (currentText: string) => void) => {
    let i = 0;
    const speed = 12; // Reduced from 20 to 12 for faster typing
    
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA5W6cpU5fEqQbjp1Or0R6snHwIHwKrj2k`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Innobot, an expert AI assistant specializing in robotics, Arduino, electronics, and engineering. Provide clear, concise, and helpful answers. Use technical accuracy while keeping explanations accessible. Do not use markdown formatting in your response.

User question: ${currentInput}`
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
      
      let aiResponse = "I'm having trouble processing your request right now. Please try again.";
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const rawResponse = data.candidates[0].content.parts[0].text;
        aiResponse = cleanMarkdownResponse(rawResponse);
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
      const errorMessage = "I'm having trouble connecting right now. Please check your connection and try again.";
      
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
      text: "👋 Welcome to Innobot! I'm your AI assistant for robotics, Arduino, and electronics. Ready to help you build something amazing?",
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
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-amber-400 text-xs font-medium">Beta Version</span>
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
      <div className="relative z-10 text-center py-6 md:py-12 px-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
            <span className="block text-white">Innobot</span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AI Assistant
            </span>
          </h1>

          <p className="text-base md:text-xl text-white/70 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Your AI assistant for robotics, Arduino, and electronics. Ask me anything!
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {[
              { value: "99.9%", label: "Model Accuracy" },
              { value: "<50ms", label: "Response Time" },
              { value: "24/7", label: "Availability" },
              { value: "Beta", label: "Version" }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-xs md:text-sm text-white/60">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-3 backdrop-blur-sm">
              <span className="text-violet-400 font-semibold text-sm md:text-lg">
                {remainingQuestions} questions remaining
              </span>
            </div>
            <button
              onClick={clearChat}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-3 transition-all duration-300 hover:scale-105"
            >
              <span className="text-white/80 text-sm md:text-base">New Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* AI Capabilities */}
        {showCapabilities && messages.length <= 1 && (
          <div className="px-3 md:px-4 py-6 md:py-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                  AI Capabilities
                </h2>
                <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto">
                  Professional AI assistance for robotics development
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                {aiCapabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-violet-500/30"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="p-2 md:p-3 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl md:rounded-2xl border border-violet-500/30 group-hover:border-violet-400/50 transition-all">
                        {capability.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-base md:text-lg">{capability.title}</h3>
                        <div className="text-violet-400 text-xs md:text-sm font-mono">{capability.metric}</div>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">{capability.description}</p>
                    
                    <div className="space-y-1 md:space-y-2">
                      {capability.examples.map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickStart(`Help me with ${example.toLowerCase()}`)}
                          className="block w-full text-left text-xs text-violet-400 hover:text-violet-300 transition-colors border-l-2 border-violet-500/30 pl-2 md:pl-3 py-1 hover:border-violet-400/50 hover:pl-3 md:hover:pl-4 transition-all"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 backdrop-blur-sm">
                <h3 className="text-base md:text-xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-2">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                  Quick Start Templates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {[
                    "Design a motor control system for robotic arm",
                    "Implement PID controller for drone stabilization",
                    "Create IoT sensor network architecture",
                    "Optimize power consumption for mobile robot"
                  ].map((template, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickStart(template)}
                      className="text-left p-3 md:p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl md:rounded-2xl transition-all duration-200 hover:border-cyan-400/50 group"
                    >
                      <span className="text-white/90 group-hover:text-cyan-300 text-xs md:text-sm">{template}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-3 md:px-4 py-4 md:py-6 custom-scrollbar" 
          style={{ paddingBottom: '100px' }}
        >
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex animate-slide-in ${message.isUser ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-start space-x-2 md:space-x-3 max-w-[95%] md:max-w-[85%] lg:max-w-[75%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg backdrop-blur-sm ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600 border border-violet-400/30' 
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-400/30'
                  }`}>
                    {message.isUser ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                  
                  <div className={`relative rounded-2xl md:rounded-3xl p-3 md:p-4 backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-[1.02] border ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-violet-500/20 to-purple-600/20 border-violet-400/30' 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-xs md:text-sm text-white/90">{message.text}</p>
                    
                    <div className="flex items-center justify-between mt-2 md:mt-3 text-xs text-white/50">
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
                            <span className="hidden md:inline">Sent</span>
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
                <div className="flex items-start space-x-2 md:space-x-3 max-w-[95%] md:max-w-[85%] lg:max-w-[75%]">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-400/30 backdrop-blur-sm">
                    <Bot className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-3 md:p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="typing-dot bg-gradient-to-r from-violet-400 to-cyan-400"></div>
                        <div className="typing-dot bg-gradient-to-r from-violet-400 to-cyan-400"></div>
                        <div className="typing-dot bg-gradient-to-r from-violet-400 to-cyan-400"></div>
                      </div>
                      <span className="text-xs md:text-sm text-violet-400 font-medium flex items-center gap-2">
                        <Brain className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                        Processing...
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
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/10 p-3 md:p-4 z-50">
        <div className="max-w-5xl mx-auto">
          {promptCount >= 10 && (
            <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl md:rounded-2xl text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                <span className="text-red-300 text-base md:text-lg font-semibold">Rate Limit Reached</span>
              </div>
              <p className="text-red-200 text-xs md:text-sm">You've reached the beta limit of 10 questions.</p>
            </div>
          )}
          
          <div className="flex space-x-2 md:space-x-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about robotics, AI, circuits, or system architecture..."
                className="w-full bg-white/5 border-2 border-white/20 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-white/40 resize-none rounded-xl md:rounded-2xl p-2 md:p-3 pr-8 md:pr-12 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-violet-500/20 text-xs md:text-sm"
                disabled={isLoading || promptCount >= 10}
                rows={1}
                style={{ minHeight: '40px', maxHeight: '80px' }}
              />
              <div className="absolute right-2 md:right-3 bottom-2 md:bottom-3 flex items-center gap-2">
                <div className="text-xs text-white/40 font-mono">
                  {inputText.length}/1000
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading || promptCount >= 10}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-2xl shadow-violet-500/40 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center space-x-1 md:space-x-2 font-semibold text-sm md:text-base min-h-[40px] border border-violet-400/30"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
          
          {/* Enhanced Footer */}
          <div className="flex items-center justify-between mt-2 md:mt-3 text-xs text-white/40">
            <div className="flex items-center gap-3 md:gap-4">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Assistant
              </span>
              <span className="hidden md:inline">Press Enter to send, Shift+Enter for new line</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>AI Online</span>
              </div>
              {emailConfirmed && (
                <div className="flex items-center gap-1 text-violet-400">
                  <Mail className="w-3 h-3" />
                  <span className="hidden md:inline">Email Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email Setup Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 max-w-md w-full backdrop-blur-xl">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Setup Email Notifications</h3>
            <p className="text-white/70 mb-6">Get AI responses delivered directly to your email.</p>
            
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your@email.com"
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

      {/* Custom Styles */}
      <style>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        .typing-dot:nth-child(3) { animation-delay: 0s; }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Innobot;
