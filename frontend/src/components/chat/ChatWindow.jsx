import { useRef, useEffect, useMemo } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import EmptyState from '../common/EmptyState';
import { format, isSameDay } from 'date-fns';

function DateSeparator({ date }) {
  return (
    <div className="flex items-center gap-4 my-4 px-4">
      <div className="flex-1 h-px bg-white/5"></div>
      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
        {format(new Date(date), 'MMMM d, yyyy')}
      </span>
      <div className="flex-1 h-px bg-white/5"></div>
    </div>
  );
}

export default function ChatWindow({ onBack }) {
  const { user } = useAuth();
  const { activeConversation, getConversationMessages, getConversationUser, sendMessage, typingUsers } = useChat();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const otherUser = activeConversation ? getConversationUser(activeConversation) : null;
  const messages = activeConversation ? getConversationMessages(activeConversation.conversationId) : [];
  const typingUser = activeConversation ? typingUsers[activeConversation.conversationId] : null;

  // Group messages with date separators
  const groupedMessages = useMemo(() => {
    const groups = [];
    let lastDate = null;
    messages.forEach((msg) => {
      const msgDate = new Date(msg.timestamp);
      if (!lastDate || !isSameDay(lastDate, msgDate)) {
        groups.push({ type: 'date', date: msg.timestamp, id: `date-${msg.timestamp}` });
        lastDate = msgDate;
      }
      groups.push({ type: 'message', ...msg });
    });
    return groups;
  }, [messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUser]);

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-navy-900/30">
        <EmptyState type="selectChat" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-navy-900/30 animate-fade-in">
      <ChatHeader user={otherUser} onBack={onBack} />

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide"
      >
        {messages.length === 0 ? (
          <EmptyState type="noMessages" />
        ) : (
          <>
            {groupedMessages.map((item) => {
              if (item.type === 'date') {
                return <DateSeparator key={item.id} date={item.date} />;
              }
              return (
                <MessageBubble
                  key={item.messageId}
                  message={item}
                  isOwn={item.senderId === user?.userId}
                />
              );
            })}
          </>
        )}
        <TypingIndicator userName={typingUser} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}
