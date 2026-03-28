import { formatMessageTime } from '../../utils/formatters';
import { Check, CheckCheck, FileText, Download } from 'lucide-react';

export default function MessageBubble({ message, isOwn, showTimestamp = true }) {
  const hasAttachment = message.attachment;
  const isImage = hasAttachment && message.attachment.type?.startsWith('image/');
  
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1 animate-slide-up`}>
      <div className={isOwn ? 'message-bubble-sent' : 'message-bubble-received'}>
        {hasAttachment && (
          <div className="mb-2">
            {isImage ? (
              <img
                src={message.attachment.url}
                alt={message.attachment.name}
                className="max-w-xs rounded-lg cursor-pointer hover:opacity-90"
                onClick={() => window.open(message.attachment.url, '_blank')}
              />
            ) : (
              <a
                href={message.attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-navy-700/50 rounded-lg hover:bg-navy-700 transition-colors"
              >
                <FileText className="w-5 h-5 text-electric" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{message.attachment.name}</p>
                  <p className="text-xs text-gray-500">
                    {(message.attachment.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </a>
            )}
          </div>
        )}
        
        {message.content && (
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
        )}
        {showTimestamp && (
          <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-[10px] ${isOwn ? 'text-white/60' : 'text-gray-500'}`}>
              {formatMessageTime(message.timestamp)}
            </span>
            {isOwn && (
              <CheckCheck className={`w-3.5 h-3.5 ${isOwn ? 'text-white/60' : 'text-gray-500'}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
