import Avatar from '../common/Avatar';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

export default function ChatHeader({ user, onBack }) {
  if (!user) return null;

  const statusText = {
    online: 'Online',
    offline: 'Offline',
    away: 'Away',
  };

  const statusColor = {
    online: 'text-emerald-400',
    offline: 'text-gray-500',
    away: 'text-amber-400',
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 
                    bg-navy-800/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            id="btn-back"
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-surface-light transition-colors text-gray-400 
                       hover:text-white md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <Avatar
          name={user.displayName}
          src={user.avatarUrl}
          size="sm"
          showStatus
          status={user.status}
        />
        <div>
          <h3 className="text-sm font-semibold text-white">{user.displayName}</h3>
          <p className={`text-xs ${statusColor[user.status] || 'text-gray-500'}`}>
            {statusText[user.status] || 'Offline'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-surface-light transition-colors text-gray-400 hover:text-white">
          <Phone className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-light transition-colors text-gray-400 hover:text-white">
          <Video className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-light transition-colors text-gray-400 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
