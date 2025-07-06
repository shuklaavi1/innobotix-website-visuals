
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  isLoading: boolean;
  promptCount: number;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput = ({ 
  inputText, 
  setInputText, 
  isLoading, 
  promptCount, 
  onSendMessage, 
  onKeyPress 
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-full">
      {promptCount >= 10 && (
        <div className="mb-4 p-4 bg-red-600/20 border border-red-500/30 rounded-2xl text-center backdrop-blur-sm">
          <span className="text-red-300 text-sm font-medium">
            🚫 Free limit reached! You've used all 10 questions.
          </span>
        </div>
      )}
      
      <div className="flex space-x-4 items-end">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask about Arduino, robotics, circuits..."
            className="bg-white/10 border-white/20 text-white placeholder-gray-400 resize-none min-h-[60px] max-h-[120px] backdrop-blur-sm rounded-2xl border-2 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-lg"
            disabled={isLoading || promptCount >= 10}
            rows={2}
          />
        </div>
        
        <Button
          onClick={onSendMessage}
          disabled={!inputText.trim() || isLoading || promptCount >= 10}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8 py-4 rounded-2xl h-[60px] transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
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
  );
};
