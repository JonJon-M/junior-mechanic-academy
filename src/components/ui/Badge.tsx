import { motion } from 'framer-motion';

interface BadgeProps {
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Badge({ emoji, name, description, earned, size = 'md' }: BadgeProps) {
  const sizes = {
    sm: { outer: 'w-12 h-12 text-2xl', text: 'text-xs', container: 'w-14' },
    md: { outer: 'w-16 h-16 text-3xl', text: 'text-xs', container: 'w-20' },
    lg: { outer: 'w-20 h-20 text-4xl', text: 'text-sm', container: 'w-24' },
  };
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center gap-1 ${s.container}`}>
      <motion.div
        whileHover={earned ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
        className={`${s.outer} rounded-full flex items-center justify-center border-2
          ${earned
            ? 'bg-gradient-to-br from-garage-yellow to-garage-orange border-garage-yellow shadow-lg shadow-yellow-500/30'
            : 'bg-garage-lightgrey border-garage-metal opacity-40 grayscale'
          }`}
        title={description}
      >
        {emoji}
      </motion.div>
      <span className={`${s.text} font-bold text-center leading-tight ${earned ? 'text-white' : 'text-gray-500'}`}>
        {name}
      </span>
    </div>
  );
}
