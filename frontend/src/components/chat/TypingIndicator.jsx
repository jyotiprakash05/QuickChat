export default function TypingIndicator({ userName }) {
  if (!userName) return null;
  
  return (
    <div className="flex items-center gap-2 px-4 py-2 animate-fade-in">
      <div className="flex items-center gap-1 bg-surface-light rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
      <span className="text-xs text-gray-500">{userName} is typing...</span>
    </div>
  );
}
