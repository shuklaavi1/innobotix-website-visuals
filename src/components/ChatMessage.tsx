
import { User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start space-x-4 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
          message.isUser 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-blue-500/50' 
            : 'bg-gradient-to-r from-gray-700 to-gray-800 border border-cyan-500/50 shadow-cyan-500/30'
        }`}>
          {message.isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <img 
              src="https://i.postimg.cc/9Qr20MFq/INNO-LOGO-FINAL.png" 
              alt="Innobot"
              className="w-6 h-6 rounded-full"
            />
          )}
        </div>
        
        {/* Message Bubble */}
        <div className={`rounded-2xl p-4 shadow-xl backdrop-blur-sm ${
          message.isUser 
            ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-blue-500/25' 
            : 'bg-white/10 text-gray-100 border border-white/20 shadow-white/10'
        }`}>
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};
