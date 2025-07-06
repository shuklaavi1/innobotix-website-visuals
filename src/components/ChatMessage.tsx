
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
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
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
  );
};
