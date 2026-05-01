import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BADGES, MODULES, getLevelForXP } from '../data/modules';
import type { PlayerProfile } from '../hooks/useProgress';
import XPBar from '../components/ui/XPBar';
import { fetchLeaderboard, upsertScore } from '../lib/supabase';
import type { LeaderboardEntry } from '../lib/supabase';

interface Props {
  profile: PlayerProfile;
  onAddToLeaderboard: (name: string, xp: number, avatar: string) => void;
}

export default function RewardsPage({ profile, onAddToLeaderboard }: Props) {
  const level = getLevelForXP(profile.xp);
  const allCompleted = profile.completedModules.length === MODULES.length;
  const printRef = useRef<HTMLDivElement>(null);
  const [globalBoard, setGlobalBoard] = useState<LeaderboardEntry[]>([]);
  const [boardLoading, setBoardLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchLeaderboard().then(data => { setGlobalBoard(data); setBoardLoading(false); });
  }, []);

  const handleAddLeaderboard = async () => {
    if (!profile.name) return;
    setSubmitting(true);
    await upsertScore({
      name: profile.name,
      avatar: profile.avatar,
      xp: profile.xp,
      badges: profile.earnedBadges.length,
      modules_done: profile.completedModules.length,
    });
    onAddToLeaderboard(profile.name, profile.xp, profile.avatar);
    const updated = await fetchLeaderboard();
    setGlobalBoard(updated);
    setSubmitting(false);
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-white mb-1">🏆 Rewards & Achievements</h1>
        <p className="text-gray-400">Your collection of badges and accomplishments.</p>
      </motion.div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total XP', value: profile.xp, emoji: '⭐', color: '#F6E05E' },
          { label: 'Badges Earned', value: profile.earnedBadges.length, emoji: '🏅', color: '#ED8936' },
          { label: 'Modules Done', value: profile.completedModules.length, emoji: '📚', color: '#4299E1' },
          { label: 'Day Streak', value: profile.streak, emoji: '🔥', color: '#E53E3E' },
        ].map(stat => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.03 }}
            className="card-dark text-center"
          >
            <div className="text-3xl mb-1">{stat.emoji}</div>
            <div className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-gray-400 font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Level progress */}
      <div className="card-dark">
        <h2 className="text-xl font-black text-white mb-4">📈 Rank Progress</h2>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{level.emoji}</span>
          <div className="flex-1">
            <div className="text-xl font-black text-garage-yellow">{level.name}</div>
            <XPBar xp={profile.xp} />
          </div>
        </div>
      </div>

      {/* Badge collection */}
      <div className="card-dark">
        <h2 className="text-xl font-black text-white mb-5">🏅 Badge Collection</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BADGES.map((badge, i) => {
            const earned = profile.earnedBadges.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={earned ? { scale: 1.05 } : {}}
                className={`rounded-2xl p-4 text-center border-2 transition-all ${
                  earned
                    ? 'border-garage-yellow bg-garage-yellow/10'
                    : 'border-garage-grey bg-garage-dark opacity-50'
                }`}
                title={badge.description}
              >
                <div className={`text-4xl mb-2 ${!earned ? 'grayscale' : ''}`}>{badge.emoji}</div>
                <div className={`text-sm font-black ${earned ? 'text-garage-yellow' : 'text-gray-500'}`}>
                  {badge.name}
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-tight">{badge.description}</div>
                {earned && <div className="text-green-400 text-xs font-bold mt-1">✅ EARNED</div>}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Module completion summary */}
      <div className="card-dark">
        <h2 className="text-xl font-black text-white mb-4">📚 Module Progress</h2>
        <div className="space-y-3">
          {MODULES.map(mod => {
            const done = profile.completedModules.includes(mod.id);
            const lessons = mod.lessons.filter(l => profile.completedLessons.includes(l.id)).length;
            const pct = Math.round((lessons / mod.lessons.length) * 100);
            return (
              <div key={mod.id} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border-2 ${
                    done ? 'border-green-500' : 'border-garage-lightgrey'
                  }`}
                  style={{ backgroundColor: done ? '#276749' : '#2D3748' }}
                >
                  {done ? '✅' : mod.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`font-bold ${done ? 'text-green-300' : 'text-white'}`}>{mod.title}</span>
                    <span className="text-gray-400">{lessons}/{mod.lessons.length}</span>
                  </div>
                  <div className="h-2 bg-garage-lightgrey rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: done ? '#48BB78' : mod.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Leaderboard */}
      <div className="card-dark">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-black text-white">🌍 Global Leaderboard</h2>
            <p className="text-xs text-gray-500">Powered by Supabase — compete with players worldwide!</p>
          </div>
          {profile.name && (
            <button
              onClick={handleAddLeaderboard}
              disabled={submitting}
              className={`btn-secondary py-2 px-4 text-sm ${submitting ? 'opacity-60' : ''}`}
            >
              {submitting ? '⏳ Saving…' : submitted ? '✅ Score Updated!' : '+ Submit My Score'}
            </button>
          )}
        </div>
        {boardLoading ? (
          <div className="text-center py-8 text-gray-500 animate-pulse">Loading scores…</div>
        ) : globalBoard.length > 0 ? (
          <div className="space-y-2">
            {globalBoard.map((entry, i) => (
              <motion.div
                key={entry.name + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  entry.name === profile.name
                    ? 'bg-garage-yellow/10 border border-garage-yellow'
                    : i === 0 ? 'bg-yellow-900/30 border border-yellow-800' : 'bg-garage-dark'
                }`}
              >
                <span className="text-2xl font-black w-8 text-center">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                </span>
                <span className="text-xl">{entry.avatar}</span>
                <span className="flex-1 font-bold text-white">
                  {entry.name}
                  {entry.name === profile.name && <span className="text-garage-yellow text-xs ml-2">(you)</span>}
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">{entry.badges} badges</span>
                <span className="text-garage-yellow font-black">{entry.xp} XP</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>No scores yet! Complete modules and add your score to the leaderboard.</p>
          </div>
        )}
      </div>

      {/* Certificate */}
      {allCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-dark"
        >
          <h2 className="text-xl font-black text-garage-yellow mb-4 text-center">🎓 Certificate of Achievement</h2>
          <div
            ref={printRef}
            className="border-4 border-garage-yellow rounded-2xl p-8 text-center bg-gradient-to-br from-garage-dark to-garage-grey"
          >
            <div className="text-5xl mb-3">🏆</div>
            <div className="text-sm font-bold text-garage-yellow uppercase tracking-widest mb-2">
              Junior Mechanic Academy
            </div>
            <h3 className="text-3xl font-black text-white mb-2">Certificate of Completion</h3>
            <div className="text-xl text-gray-300 mb-3">This certifies that</div>
            <div className="text-4xl font-black text-garage-yellow mb-3">
              {profile.avatar} {profile.name || 'Young Mechanic'}
            </div>
            <div className="text-gray-300 text-lg mb-4">
              has successfully completed all 5 levels of Junior Mechanic Academy,
              <br />earning the rank of <strong className="text-garage-yellow">Master Engineer</strong>
            </div>
            <div className="flex justify-center gap-8 mt-4 text-sm text-gray-400">
              <div><strong className="text-white text-xl">{profile.xp}</strong><br />XP Earned</div>
              <div><strong className="text-white text-xl">{profile.earnedBadges.length}</strong><br />Badges</div>
              <div><strong className="text-white text-xl">5/5</strong><br />Modules</div>
            </div>
            <div className="mt-4 text-xs text-gray-500">Date: {new Date().toLocaleDateString()}</div>
          </div>
          <button onClick={handlePrint} className="btn-primary w-full mt-4">
            🖨️ Print Certificate
          </button>
        </motion.div>
      )}

      {!allCompleted && (
        <div className="card-dark text-center py-6 border-dashed border-2 border-garage-lightgrey">
          <div className="text-4xl mb-2">🎓</div>
          <h3 className="text-xl font-black text-gray-400 mb-1">Certificate Locked</h3>
          <p className="text-gray-500">Complete all 5 modules to unlock your printable certificate!</p>
          <p className="text-sm text-garage-yellow mt-2 font-bold">
            {MODULES.length - profile.completedModules.length} module(s) remaining
          </p>
        </div>
      )}
    </div>
  );
}
