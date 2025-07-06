
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
        <div className="mb-3 md:mb-4 p-3 md:p-4 bg-red-600/20 border border-red-500/30 rounded-2xl text-center backdrop-blur-sm">
          <span className="text-red-300 text-xs md:text-sm font-medium">
            🚫 Free limit reached! You've used all 10 questions.
          </span>
        </div>
      )}
      
      <div className="flex space-x-2 md:space-x-4 items-end">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask about Arduino, robotics, circuits..."
            className="bg-white/10 border-white/20 text-white placeholder-gray-400 resize-none min-h-[50px] md:min-h-[60px] max-h-[100px] md:max-h-[120px] backdrop-blur-sm rounded-2xl border-2 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-lg text-sm md:text-base"
            disabled={isLoading || promptCount >= 10}
            rows={2}
          />
        </div>
        
        <Button
          onClick={onSendMessage}
          disabled={!inputText.trim() || isLoading || promptCount >= 10}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-4 md:px-8 py-3 md:py-4 rounded-2xl h-[50px] md:h-[60px] transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 text-sm md:text-base"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Ask Innobot</span>
              <span className="md:hidden">Ask</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
