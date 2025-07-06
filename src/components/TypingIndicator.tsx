
export const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-start space-x-4 max-w-[85%]">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 border border-cyan-500/50 shadow-lg shadow-cyan-500/30">
          <img 
            src="https://i.postimg.cc/9Qr20MFq/INNO-LOGO-FINAL.png" 
            alt="Innobot"
            className="w-6 h-6 rounded-full"
          />
        </div>
        <div className="bg-black/30 text-gray-100 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-sm shadow-cyan-400/50"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-sm shadow-cyan-400/50" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-sm shadow-cyan-400/50" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-gray-300">Thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
