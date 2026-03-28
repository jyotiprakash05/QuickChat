import { useState, useMemo } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import ChatListItem from './ChatListItem';
import EmptyState from '../common/EmptyState';
import { Search, Plus, Settings, MessageSquarePlus } from 'lucide-react';

export default function ChatList({ onSettingsClick }) {
  const { user } = useAuth();
  const { conversations, activeConversation, selectConversation, getConversationUser } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter((conv) => {
      const otherUser = getConversationUser(conv);
      return (
        otherUser?.displayName?.toLowerCase().includes(q) ||
        conv.lastMessage?.toLowerCase().includes(q)
      );
    });
  }, [conversations, searchQuery, getConversationUser]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-blue-600 
                            flex items-center justify-center shadow-lg shadow-electric/20">
              <MessageSquarePlus className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">QuickChat</h1>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40 mt-0.5"></div>
          </div>
          <div className="flex items-center gap-1">
            <button
              id="btn-new-chat"
              className="p-2 rounded-lg hover:bg-surface-light transition-colors text-gray-400 hover:text-white"
              title="New chat"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              id="btn-settings"
              onClick={onSettingsClick}
              className="p-2 rounded-lg hover:bg-surface-light transition-colors text-gray-400 hover:text-white"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            id="chat-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-navy-800 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm 
                       text-white placeholder-gray-500 focus:border-electric/30 focus:ring-1 
                       focus:ring-electric/20 transition-all"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-hide">
        {filteredConversations.length === 0 ? (
          <EmptyState type={searchQuery ? 'noResults' : 'noChats'} />
        ) : (
          <div className="space-y-0.5">
            {filteredConversations.map((conv) => {
              const otherUser = getConversationUser(conv);
              return (
                <ChatListItem
                  key={conv.conversationId}
                  conversation={conv}
                  otherUser={otherUser}
                  isActive={activeConversation?.conversationId === conv.conversationId}
                  onClick={() => selectConversation(conv.conversationId)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-light transition-colors cursor-pointer"
             onClick={onSettingsClick}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric to-blue-600 
                          flex items-center justify-center text-xs font-bold text-white">
            {user?.displayName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.displayName || 'User'}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
