import { motion } from 'framer-motion';
import { getLevelForXP, getXPProgress, LEVELS } from '../../data/modules';

interface Props {
  xp: number;
  showLabel?: boolean;
  compact?: boolean;
}

export default function XPBar({ xp, showLabel = true, compact = false }: Props) {
  const level = getLevelForXP(xp);
  const progress = getXPProgress(xp);
  const nextLevel = LEVELS[level.index + 1];

  return (
    <div className={compact ? '' : 'w-full'}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-garage-yellow flex items-center gap-1">
            {level.emoji} {level.name}
          </span>
          <span className="text-sm text-gray-400">
            {xp} XP {nextLevel ? `/ ${nextLevel.minXP} XP` : '(MAX)'}
          </span>
        </div>
      )}
      <div className="xp-bar">
        <motion.div
          className="xp-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
