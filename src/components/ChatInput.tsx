
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
    <div className="border-t border-gray-800/50 p-4 bg-[#0d0d0d]/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        {promptCount >= 5 && (
          <div className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-xl text-center">
            <span className="text-red-300 text-sm">🚫 Free limit reached! You've used all 5 questions.</span>
          </div>
        )}
        <div className="flex space-x-3 items-end">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Ask about Arduino, robotics, circuits..."
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 resize-none min-h-[50px] max-h-[50px] backdrop-blur-sm rounded-xl border-2 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              disabled={isLoading || promptCount >= 5}
              rows={1}
            />
          </div>
          <Button
            onClick={onSendMessage}
            disabled={!inputText.trim() || isLoading || promptCount >= 5}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-6 py-3 rounded-xl h-[50px] transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
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
    </div>
  );
};
