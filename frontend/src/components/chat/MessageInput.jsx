import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import FileUpload from './FileUpload';

export default function MessageInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const textareaRef = useRef(null);

  const handleSend = (attachment = null) => {
    if ((!message.trim() && !attachment) || disabled) return;
    onSend(message, attachment);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleFileUpload = (fileData) => {
    handleSend(fileData);
    setShowFileUpload(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  return (
    <div className="p-3 border-t border-white/5 bg-navy-800/50 backdrop-blur-sm relative">
      {showFileUpload && (
        <FileUpload
          onUploadComplete={handleFileUpload}
          onCancel={() => setShowFileUpload(false)}
        />
      )}
      
      <div className="flex items-end gap-2">
        <button
          onClick={() => setShowFileUpload(!showFileUpload)}
          className="p-2.5 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-surface-light 
                     transition-all shrink-0 mb-0.5"
          title="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <textarea
            id="message-input"
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            disabled={disabled}
            className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3 text-sm text-white 
                       placeholder-gray-500 resize-none focus:border-electric/30 focus:ring-1 
                       focus:ring-electric/20 transition-all max-h-[120px] scrollbar-hide"
          />
        </div>

        <button
          className="p-2.5 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-surface-light 
                     transition-all shrink-0 mb-0.5"
          title="Emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        <button
          id="btn-send"
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`p-2.5 rounded-xl transition-all shrink-0 mb-0.5
            ${message.trim() && !disabled
              ? 'bg-electric text-white shadow-lg shadow-electric/25 hover:bg-electric-600 hover:scale-105 active:scale-95'
              : 'bg-surface-light text-gray-600 cursor-not-allowed'
            }`}
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
