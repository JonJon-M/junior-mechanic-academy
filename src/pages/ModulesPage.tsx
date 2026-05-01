import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MODULES } from '../data/modules';
import type { PlayerProfile } from '../hooks/useProgress';

interface Props {
  profile: PlayerProfile;
}

export default function ModulesPage({ profile }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-white mb-1">📚 Learning Modules</h1>
        <p className="text-gray-400 mb-6">
          Master each level to unlock the next one. You have <span className="text-garage-yellow font-bold">{profile.xp} XP</span>.
        </p>
      </motion.div>

      <div className="grid gap-5">
        {MODULES.map((mod, i) => {
          const isUnlocked = profile.xp >= mod.unlockRequirement;
          const isCompleted = profile.completedModules.includes(mod.id);
          const lessonsCompleted = mod.lessons.filter(l => profile.completedLessons.includes(l.id)).length;
          const quizDone = !!profile.quizScores[mod.id];

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div
                className={`rounded-3xl border-2 overflow-hidden transition-all ${
                  isCompleted
                    ? 'border-green-600'
                    : isUnlocked
                      ? 'border-garage-lightgrey hover:border-white'
                      : 'border-garage-grey opacity-60'
                }`}
              >
                {/* Header */}
                <div
                  className="p-5 flex items-center gap-4"
                  style={{ backgroundColor: `${mod.bgColor}` }}
                >
                  <div className="text-5xl">{isCompleted ? '✅' : isUnlocked ? mod.emoji : '🔒'}</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest">Level {mod.level}</div>
                    <h2 className="text-2xl font-black text-white">{mod.title}</h2>
                    <p className="text-white/70 text-sm">{mod.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-garage-yellow">{mod.xpTotal} XP</div>
                    <div className="text-white/60 text-xs">{mod.badge.emoji} {mod.badge.name}</div>
                  </div>
                </div>

                {/* Lessons list */}
                <div className="bg-garage-grey p-4 space-y-2">
                  {mod.lessons.map((lesson, li) => {
                    const done = profile.completedLessons.includes(lesson.id);
                    return (
                      <div key={lesson.id} className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black border-2 ${
                          done
                            ? 'bg-green-700 border-green-500 text-white'
                            : 'bg-garage-dark border-garage-lightgrey text-gray-500'
                        }`}>
                          {done ? '✓' : li + 1}
                        </div>
                        <span className={`font-semibold ${done ? 'text-green-300' : 'text-gray-300'}`}>
                          {lesson.emoji} {lesson.title}
                        </span>
                        <span className="ml-auto text-xs text-garage-yellow font-bold">+{lesson.xpReward} XP</span>
                      </div>
                    );
                  })}

                  {/* Quiz row */}
                  <div className="flex items-center gap-3 pt-2 border-t border-garage-lightgrey">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black border-2 ${
                      quizDone
                        ? 'bg-garage-yellow border-garage-yellow text-garage-dark'
                        : 'bg-garage-dark border-garage-lightgrey text-gray-500'
                    }`}>
                      {quizDone ? '⭐' : '?'}
                    </div>
                    <span className={`font-semibold ${quizDone ? 'text-garage-yellow' : 'text-gray-400'}`}>
                      📝 Module Quiz
                    </span>
                    {quizDone && (
                      <span className="text-xs text-garage-yellow font-bold">
                        {profile.quizScores[mod.id]}/{mod.quiz.length} correct
                      </span>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <div className="bg-garage-dark p-4 flex items-center justify-between">
                  {isUnlocked ? (
                    <Link
                      to={`/module/${mod.id}`}
                      className="btn-primary py-2 px-6 text-base"
                    >
                      {isCompleted ? '🔄 Review Module' : lessonsCompleted > 0 ? '▶ Continue' : '▶ Start Module'}
                    </Link>
                  ) : (
                    <div className="text-gray-500 font-bold flex items-center gap-2">
                      🔒 Unlock at {mod.unlockRequirement} XP
                      <span className="text-xs text-gray-600">
                        ({mod.unlockRequirement - profile.xp} more needed)
                      </span>
                    </div>
                  )}
                  {isCompleted && (
                    <span className="text-green-400 font-bold text-sm">✅ Completed!</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
