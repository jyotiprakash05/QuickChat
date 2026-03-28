import { getInitials } from '../../utils/formatters';

const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
  'from-teal-500 to-green-500',
  'from-red-500 to-orange-500',
];

function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function Avatar({ name, src, size = 'md', showStatus, status, className = '' }) {
  const sizeClasses = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
  };

  const statusDotSizes = {
    xs: 'w-2.5 h-2.5 border',
    sm: 'w-3 h-3 border-2',
    md: 'w-3.5 h-3.5 border-2',
    lg: 'w-4 h-4 border-2',
    xl: 'w-5 h-5 border-2',
  };

  const statusColors = {
    online: 'bg-emerald-400 shadow-emerald-400/40',
    offline: 'bg-gray-500',
    away: 'bg-amber-400 shadow-amber-400/40',
  };

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white/10`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getColorFromName(name)} 
                      flex items-center justify-center font-semibold text-white ring-2 ring-white/10
                      shadow-lg`}
        >
          {getInitials(name)}
        </div>
      )}
      {showStatus && status && (
        <span
          className={`absolute bottom-0 right-0 ${statusDotSizes[size]} ${statusColors[status]} 
                     rounded-full border-navy-700 shadow-lg`}
        />
      )}
    </div>
  );
}
