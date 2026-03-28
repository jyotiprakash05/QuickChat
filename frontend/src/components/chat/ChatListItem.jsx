import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import { formatChatTimestamp, truncateText } from '../../utils/formatters';

export default function ChatListItem({ conversation, otherUser, isActive, onClick }) {
  return (
    <div
      id={`chat-item-${conversation.conversationId}`}
      onClick={onClick}
      className={`sidebar-item group ${isActive ? 'active bg-surface-light' : ''}`}
    >
      <Avatar
        name={otherUser?.displayName}
        src={otherUser?.avatarUrl}
        size="md"
        showStatus
        status={otherUser?.status}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h4 className="text-sm font-semibold text-white truncate">
            {otherUser?.displayName || 'Unknown'}
          </h4>
          <span className="text-xs text-gray-500 shrink-0 ml-2">
            {formatChatTimestamp(conversation.lastMessageAt)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 truncate pr-2">
            {truncateText(conversation.lastMessage, 35)}
          </p>
          <Badge count={conversation.unreadCount} />
        </div>
      </div>
    </div>
  );
}
