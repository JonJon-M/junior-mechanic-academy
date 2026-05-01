import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import XPBar from './XPBar';
import type { PlayerProfile } from '../../hooks/useProgress';

interface Props {
  profile: PlayerProfile;
}

export default function Navbar({ profile }: Props) {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Garage', emoji: '🏠' },
    { path: '/modules', label: 'Learn', emoji: '📚' },
    { path: '/activities', label: 'Play', emoji: '🎮' },
    { path: '/rewards', label: 'Rewards', emoji: '🏆' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-garage-darker/95 backdrop-blur border-b border-garage-grey">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🔧</span>
          <span className="font-display font-black text-garage-yellow text-lg hidden sm:block">
            JMA
          </span>
        </Link>

        {profile.name && (
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs">
            <span className="text-2xl">{profile.avatar}</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-white truncate">{profile.name}</div>
              <XPBar xp={profile.xp} showLabel={false} compact />
            </div>
            <span className="text-garage-yellow font-bold text-sm">{profile.xp} XP</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-1
                  ${location.pathname === item.path
                    ? 'bg-garage-red text-white'
                    : 'text-gray-400 hover:text-white hover:bg-garage-grey'
                  }`}
              >
                <span>{item.emoji}</span>
                <span className="hidden sm:block">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
