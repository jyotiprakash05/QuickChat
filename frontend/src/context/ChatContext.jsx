import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_USERS, getOtherUser } from '../data/mockData';
import { generateId } from '../utils/formatters';
import { useAuth } from './AuthContext';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});

  // Load conversations on mount
  useEffect(() => {
    if (user) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setConversations(MOCK_CONVERSATIONS);
        setMessages(MOCK_MESSAGES);
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const selectConversation = useCallback((conversationId) => {
    const conv = conversations.find((c) => c.conversationId === conversationId);
    setActiveConversation(conv);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) =>
        c.conversationId === conversationId ? { ...c, unreadCount: 0 } : c
      )
    );
  }, [conversations]);

  const sendMessage = useCallback((content, attachment = null) => {
    if (!activeConversation || (!content.trim() && !attachment)) return;

    const newMessage = {
      messageId: generateId(),
      conversationId: activeConversation.conversationId,
      senderId: user.userId,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      type: attachment ? 'attachment' : 'text',
      attachment: attachment || undefined,
    };

    // Add message
    setMessages((prev) => ({
      ...prev,
      [activeConversation.conversationId]: [
        ...(prev[activeConversation.conversationId] || []),
        newMessage,
      ],
    }));

    // Update conversation preview
    const previewText = attachment ? `📎 ${attachment.name}` : content.trim();
    setConversations((prev) =>
      prev.map((c) =>
        c.conversationId === activeConversation.conversationId
          ? { ...c, lastMessage: previewText, lastMessageAt: newMessage.timestamp }
          : c
      ).sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
    );

    // Simulate reply after random delay
    const otherUser = getOtherUser(activeConversation, user.userId);
    if (otherUser.status === 'online') {
      // Show typing indicator
      setTimeout(() => {
        setTypingUsers((prev) => ({ ...prev, [activeConversation.conversationId]: otherUser.displayName }));
      }, 1000);

      // Send reply
      const replyDelay = 2500 + Math.random() * 2000;
      setTimeout(() => {
        setTypingUsers((prev) => {
          const copy = { ...prev };
          delete copy[activeConversation.conversationId];
          return copy;
        });

        const replies = [
          "That's interesting! Tell me more about it.",
          "Awesome, sounds like a plan! 🚀",
          "I completely agree. Let's move forward with that approach.",
          "Great progress! Keep up the excellent work.",
          "Good point! I hadn't considered that angle.",
          "Let me check on that and get back to you shortly.",
          "Perfect! I'll add that to our sprint board.",
          "Nice work! The implementation looks clean. 👏",
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMsg = {
          messageId: generateId(),
          conversationId: activeConversation.conversationId,
          senderId: otherUser.userId,
          content: reply,
          timestamp: new Date().toISOString(),
          type: 'text',
        };

        setMessages((prev) => ({
          ...prev,
          [activeConversation.conversationId]: [
            ...(prev[activeConversation.conversationId] || []),
            replyMsg,
          ],
        }));

        setConversations((prev) =>
          prev.map((c) =>
            c.conversationId === activeConversation.conversationId
              ? { ...c, lastMessage: reply, lastMessageAt: replyMsg.timestamp }
              : c
          ).sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
        );
      }, replyDelay);
    }
  }, [activeConversation, user]);

  const getConversationMessages = useCallback((conversationId) => {
    return messages[conversationId] || [];
  }, [messages]);

  const getConversationUser = useCallback((conversation) => {
    if (!user) return null;
    return getOtherUser(conversation, user.userId);
  }, [user]);

  const searchConversations = useCallback((query) => {
    if (!query.trim()) return conversations;
    const q = query.toLowerCase();
    return conversations.filter((conv) => {
      const otherUser = getOtherUser(conv, user?.userId);
      return (
        otherUser.displayName.toLowerCase().includes(q) ||
        conv.lastMessage?.toLowerCase().includes(q)
      );
    });
  }, [conversations, user]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        loading,
        typingUsers,
        selectConversation,
        sendMessage,
        getConversationMessages,
        getConversationUser,
        searchConversations,
        setActiveConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
}

export default ChatContext;
