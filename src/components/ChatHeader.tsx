
interface ChatHeaderProps {
  promptCount: number;
  onClearChat: () => void;
}

export const ChatHeader = ({ promptCount, onClearChat }: ChatHeaderProps) => {
  const remainingQuestions = Math.max(0, 5 - promptCount);

  return (
    <>
      {/* Beta Banner */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-500/30 py-2 text-center">
        <span className="text-amber-300 text-sm font-medium">
          🧪 Beta Version – Help us improve. This is a test release.
        </span>
      </div>

      {/* Header Section */}
      <div className="text-center py-6 px-4 border-b border-gray-800/50">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-3">
          🤖 Innobot – Your Robotics AI Assistant (Beta)
        </h1>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm">
            Questions left: <span className="font-bold text-blue-400">{remainingQuestions}/5</span>
          </div>
          <button
            onClick={onClearChat}
            className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 rounded-full px-4 py-2 text-sm transition-all text-gray-300 hover:text-white"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </>
  );
};
