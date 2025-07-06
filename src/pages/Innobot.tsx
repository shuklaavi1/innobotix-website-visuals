
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatInput } from "@/components/ChatInput";
import { useState, useRef, useEffect } from "react";

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

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-['Poppins',sans-serif] flex flex-col">
      <Navigation />
      
      <ChatHeader promptCount={promptCount} onClearChat={clearChat} />

      {/* Chat Container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* Typing Indicator */}
            {isLoading && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Fixed at bottom */}
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          isLoading={isLoading}
          promptCount={promptCount}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Innobot;
