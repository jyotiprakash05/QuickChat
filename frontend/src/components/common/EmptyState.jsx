import { MessageSquare, Search, UserPlus } from 'lucide-react';

const PRESETS = {
  noChats: {
    icon: MessageSquare,
    title: 'No conversations yet',
    description: 'Start a new conversation to begin chatting',
  },
  noMessages: {
    icon: MessageSquare,
    title: 'No messages yet',
    description: 'Send the first message to start the conversation',
  },
  noResults: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search query',
  },
  selectChat: {
    icon: MessageSquare,
    title: 'Select a conversation',
    description: 'Choose a chat from the sidebar to start messaging',
  },
};

export default function EmptyState({ type = 'selectChat', className = '' }) {
  const preset = PRESETS[type] || PRESETS.selectChat;
  const Icon = preset.icon;

  return (
    <div className={`flex flex-col items-center justify-center h-full text-center p-8 ${className}`}>
      <div className="w-20 h-20 rounded-2xl bg-surface-light flex items-center justify-center mb-5
                      border border-white/5 shadow-xl">
        <Icon className="w-10 h-10 text-electric/60" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{preset.title}</h3>
      <p className="text-sm text-gray-400 max-w-xs">{preset.description}</p>
    </div>
  );
}
