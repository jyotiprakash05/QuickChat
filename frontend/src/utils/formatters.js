import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export function formatMessageTime(dateString) {
  const date = new Date(dateString);
  return format(date, 'h:mm a');
}

export function formatChatTimestamp(dateString) {
  const date = new Date(dateString);
  if (isToday(date)) return format(date, 'h:mm a');
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d');
}

export function formatRelativeTime(dateString) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text, maxLength = 40) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
