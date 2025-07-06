
interface ChatHeaderProps {
  promptCount: number;
  onClearChat: () => void;
}

export const ChatHeader = ({ promptCount, onClearChat }: ChatHeaderProps) => {
  const remainingQuestions = Math.max(0, 10 - promptCount);

  return (
    <div className="text-center py-4 md:py-8 px-3 md:px-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/10 flex-shrink-0">
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/50">
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
            <img 
              src="https://i.postimg.cc/9Qr20MFq/INNO-LOGO-FINAL.png" 
              alt="Innobotix"
              className="w-4 h-4 md:w-7 md:h-7 rounded-full"
            />
          </div>
        </div>
        <h1 className="text-xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
          Innobot
        </h1>
      </div>
      
      <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6 font-light">
        Your Advanced Robotics AI Assistant
      </p>
      
      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm backdrop-blur-sm shadow-lg">
          <span className="text-gray-300">Questions remaining: </span>
          <span className="font-bold text-blue-400 text-sm md:text-lg">{remainingQuestions}/10</span>
        </div>
        <button
          onClick={onClearChat}
          className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm transition-all text-gray-300 hover:text-white backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};
