
export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-[80%]">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border border-cyan-500/50">
          <img 
            src="https://i.postimg.cc/9Qr20MFq/INNO-LOGO-FINAL.png" 
            alt="Innobot"
            className="w-5 h-5 rounded-full"
          />
        </div>
        <div className="bg-gray-800/90 text-gray-100 border border-gray-700/50 rounded-2xl p-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-gray-300">Thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
