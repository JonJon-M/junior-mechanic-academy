import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { PlayerProfile } from '../hooks/useProgress';
import { MODULES, getLevelForXP, getXPProgress, LEVELS } from '../data/modules';
import XPBar from '../components/ui/XPBar';
import GearAnimation from '../components/animations/GearAnimation';

const AVATARS = ['👨‍🔧', '👩‍🔧', '🧑‍🔧', '👦', '👧', '🤖', '🦸', '🧙'];

interface Props {
  profile: PlayerProfile;
  onUpdateName: (name: string) => void;
  onUpdateAvatar: (avatar: string) => void;
}

export default function HomePage({ profile, onUpdateName, onUpdateAvatar }: Props) {
  const [nameInput, setNameInput] = useState(profile.name);
  const [editingName, setEditingName] = useState(!profile.name);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const level = getLevelForXP(profile.xp);
  const nextLevel = LEVELS[level.index + 1];

  const saveName = () => {
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setEditingName(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-garage-red via-red-700 to-garage-dark border border-red-800 p-6 sm:p-8"
      >
        {/* Background decoration */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <GearAnimation size={200} />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <motion.button
              onClick={() => setShowAvatarPicker(p => !p)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-garage-dark border-4 border-garage-yellow
                         text-5xl flex items-center justify-center shadow-xl"
            >
              {profile.avatar}
            </motion.button>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-garage-yellow rounded-full
                           flex items-center justify-center text-xs text-garage-dark font-black">
              ✏️
            </div>
          </div>

          {/* Profile info */}
          <div className="flex-1">
            {editingName ? (
              <div className="flex gap-2 mb-3">
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                  placeholder="What's your name?"
                  className="bg-garage-dark border-2 border-garage-yellow rounded-xl px-4 py-2
                             text-white font-bold text-lg focus:outline-none w-full max-w-xs"
                  autoFocus
                />
                <button onClick={saveName} className="btn-secondary py-2 px-4 text-base">✓</button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {profile.name ? `Hey, ${profile.name}!` : 'Welcome!'}
                </h1>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-garage-yellow text-sm opacity-70 hover:opacity-100"
                >✏️</button>
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{level.emoji}</span>
              <span className="font-black text-garage-yellow text-xl">{level.name}</span>
              {profile.streak > 0 && (
                <span className="bg-orange-900 border border-orange-500 text-orange-300 text-sm
                               font-bold px-2 py-0.5 rounded-full">
                  🔥 {profile.streak} day streak!
                </span>
              )}
            </div>

            <div className="max-w-sm">
              <XPBar xp={profile.xp} />
            </div>
          </div>

          {/* Stats */}
          <div className="flex sm:flex-col gap-4 sm:gap-2 text-center">
            <div className="bg-garage-dark/60 rounded-xl px-4 py-2">
              <div className="text-2xl font-black text-garage-yellow">{profile.xp}</div>
              <div className="text-xs text-gray-400 font-bold">Total XP</div>
            </div>
            <div className="bg-garage-dark/60 rounded-xl px-4 py-2">
              <div className="text-2xl font-black text-garage-yellow">{profile.earnedBadges.length}</div>
              <div className="text-xs text-gray-400 font-bold">Badges</div>
            </div>
            <div className="bg-garage-dark/60 rounded-xl px-4 py-2">
              <div className="text-2xl font-black text-garage-yellow">{profile.completedModules.length}</div>
              <div className="text-xs text-gray-400 font-bold">Modules</div>
            </div>
          </div>
        </div>

        {/* Avatar picker */}
        <AnimatePresence>
          {showAvatarPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex gap-3 flex-wrap"
            >
              {AVATARS.map(av => (
                <button
                  key={av}
                  onClick={() => { onUpdateAvatar(av); setShowAvatarPicker(false); }}
                  className={`w-12 h-12 rounded-xl text-2xl border-2 transition-all flex items-center justify-center
                    ${profile.avatar === av
                      ? 'border-garage-yellow bg-garage-yellow/20'
                      : 'border-garage-lightgrey hover:border-white bg-garage-dark/60'
                    }`}
                >
                  {av}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Start Learning', emoji: '📚', to: '/modules', color: 'from-blue-700 to-blue-900' },
          { label: 'Play Activities', emoji: '🎮', to: '/activities', color: 'from-purple-700 to-purple-900' },
          { label: 'View Badges', emoji: '🏆', to: '/rewards', color: 'from-yellow-700 to-yellow-900' },
          { label: 'Leaderboard', emoji: '📊', to: '/leaderboard', color: 'from-green-700 to-green-900' },
        ].map(item => (
          <Link key={item.to} to={item.to}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 text-center border border-white/10 cursor-pointer h-full`}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="font-bold text-white text-sm">{item.label}</div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Progress Map */}
      <div>
        <h2 className="text-2xl font-black text-white mb-4">🗺️ Learning Path</h2>
        <div className="space-y-3">
          {MODULES.map((mod, i) => {
            const isUnlocked = profile.xp >= mod.unlockRequirement;
            const isCompleted = profile.completedModules.includes(mod.id);
            const lessonsCompleted = mod.lessons.filter(l => profile.completedLessons.includes(l.id)).length;
            const progress = Math.round((lessonsCompleted / mod.lessons.length) * 100);

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={isUnlocked ? `/module/${mod.id}` : '#'}>
                  <motion.div
                    whileHover={isUnlocked ? { scale: 1.01 } : {}}
                    className={`rounded-2xl p-4 border-2 transition-all flex items-center gap-4 ${
                      isCompleted
                        ? 'border-green-600 bg-green-900/20'
                        : isUnlocked
                          ? 'border-garage-lightgrey bg-garage-grey hover:border-white cursor-pointer'
                          : 'border-garage-grey bg-garage-dark/50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Level indicator */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 border-2"
                      style={{
                        backgroundColor: isUnlocked ? `${mod.color}30` : '#1A1A2E',
                        borderColor: isUnlocked ? mod.color : '#4A5568',
                      }}
                    >
                      {isCompleted ? '✅' : isUnlocked ? mod.emoji : '🔒'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-400 uppercase">Level {mod.level}</span>
                        {isCompleted && <span className="text-xs bg-green-800 text-green-200 px-2 py-0.5 rounded-full font-bold">COMPLETE</span>}
                        {!isUnlocked && <span className="text-xs bg-garage-dark text-gray-500 px-2 py-0.5 rounded-full font-bold">🔒 {mod.unlockRequirement} XP</span>}
                      </div>
                      <div className="font-black text-white text-lg">{mod.title}</div>
                      <div className="text-gray-400 text-sm truncate">{mod.description}</div>
                      {isUnlocked && !isCompleted && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{lessonsCompleted}/{mod.lessons.length} lessons</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-1.5 bg-garage-lightgrey rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${progress}%`, backgroundColor: mod.color }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-garage-yellow font-black">{mod.xpTotal} XP</div>
                      <div className="text-xs text-gray-400">{mod.lessons.length} lessons</div>
                    </div>
                  </motion.div>
                </Link>

                {/* Connector line */}
                {i < MODULES.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className={`w-0.5 h-4 ${isUnlocked ? 'bg-garage-lightgrey' : 'bg-garage-dark'}`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next level info */}
      {nextLevel && (
        <div className="card-dark text-center">
          <div className="text-2xl mb-2">{nextLevel.emoji}</div>
          <div className="font-black text-garage-yellow text-lg">Next Rank: {nextLevel.name}</div>
          <div className="text-gray-400 text-sm mt-1">
            {nextLevel.minXP - profile.xp} more XP to go!
          </div>
          <div className="mt-3 max-w-xs mx-auto">
            <div className="h-3 bg-garage-lightgrey rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: nextLevel.color }}
                animate={{ width: `${getXPProgress(profile.xp)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
