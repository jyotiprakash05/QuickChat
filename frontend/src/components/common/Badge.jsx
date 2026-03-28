export default function Badge({ count, className = '' }) {
  if (!count || count <= 0) return null;
  
  return (
    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 
                      bg-electric text-white text-xs font-bold rounded-full 
                      shadow-lg shadow-electric/30 ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}
