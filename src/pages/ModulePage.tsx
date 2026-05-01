import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULES } from '../data/modules';
import type { Lesson } from '../data/modules';
import type { PlayerProfile } from '../hooks/useProgress';
import QuizArena from '../components/activities/QuizArena';
import FourStrokeEngine from '../components/animations/FourStrokeEngine';
import CarDiagram from '../components/animations/CarDiagram';

interface Props {
  profile: PlayerProfile;
  onCompleteLesson: (id: string, xp: number) => PlayerProfile;
  onCompleteModule: (moduleId: string, badgeId: string) => PlayerProfile;
  onSubmitQuiz: (moduleId: string, score: number, total: number) => PlayerProfile;
}

// Simple markdown-like renderer
function LessonContent({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-3 text-lg leading-relaxed text-gray-200">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;

        // Bold headers **text**
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black">$1</strong>');

        if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
          return (
            <h3
              key={i}
              className="text-xl font-black text-garage-yellow mt-4"
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
          );
        }

        if (line.match(/^\*\*\d+\./)) {
          return (
            <div key={i} className="bg-garage-dark rounded-xl p-3 border-l-4 border-garage-yellow">
              <p dangerouslySetInnerHTML={{ __html: formatted }} />
            </div>
          );
        }

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      })}
    </div>
  );
}

function LessonView({ lesson, onComplete, alreadyDone }: {
  lesson: Lesson;
  onComplete: () => void;
  alreadyDone: boolean;
}) {
  const [done, setDone] = useState(alreadyDone);
  const [showXP, setShowXP] = useState(false);

  const handleComplete = () => {
    if (!done) {
      setDone(true);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 2000);
    }
    onComplete();
  };

  // Special interactive components for certain lessons
  const showFourStroke = lesson.id === 'l2-four-stroke';
  const showCarDiagram = lesson.id === 'l1-four-parts' || lesson.id === 'l1-labelling';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Lesson header */}
      <div className="card-dark">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-4xl">{lesson.emoji}</span>
          <div>
            <h2 className="text-2xl font-black text-white">{lesson.title}</h2>
            <span className="text-garage-yellow font-bold">+{lesson.xpReward} XP</span>
          </div>
        </div>

        <LessonContent content={lesson.content} />

        {/* Fun fact */}
        {lesson.funFact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 bg-garage-yellow/10 border-l-4 border-garage-yellow rounded-r-xl p-4"
          >
            <div className="font-black text-garage-yellow mb-1 flex items-center gap-2">
              💡 Fun Fact!
            </div>
            <p className="text-gray-200">{lesson.funFact}</p>
          </motion.div>
        )}

        {/* Analogy */}
        {lesson.analogy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 bg-blue-900/30 border-l-4 border-blue-400 rounded-r-xl p-4"
          >
            <div className="font-black text-blue-300 mb-1">🧠 Think of it this way:</div>
            <p className="text-gray-200 italic">{lesson.analogy}</p>
          </motion.div>
        )}
      </div>

      {/* Interactive components */}
      {showFourStroke && <FourStrokeEngine />}
      {showCarDiagram && <CarDiagram />}

      {/* Complete button */}
      <div className="relative">
        <AnimatePresence>
          {showXP && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              transition={{ duration: 1.5 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-garage-yellow font-black text-2xl pointer-events-none"
            >
              +{lesson.xpReward} XP! ⭐
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={handleComplete}
          className={`w-full py-4 rounded-2xl font-black text-xl transition-all ${
            done
              ? 'bg-green-700 text-white border-2 border-green-500'
              : 'btn-primary'
          }`}
        >
          {done ? '✅ Lesson Complete! → Next' : '✅ Mark as Complete (+' + lesson.xpReward + ' XP)'}
        </button>
      </div>
    </motion.div>
  );
}

export default function ModulePage({ profile, onCompleteLesson, onCompleteModule, onSubmitQuiz }: Props) {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = MODULES.find(m => m.id === moduleId);

  const [activeLesson, setActiveLesson] = useState<number>(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(!!profile.quizScores[moduleId || '']);
  const [moduleCompleted, setModuleCompleted] = useState(profile.completedModules.includes(moduleId || ''));

  if (!module) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-black text-white mb-4">Module not found!</h2>
        <Link to="/modules" className="btn-primary">← Back to Modules</Link>
      </div>
    );
  }

  if (profile.xp < module.unlockRequirement) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-black text-white mb-2">Module Locked</h2>
        <p className="text-gray-400 mb-4">You need {module.unlockRequirement} XP to unlock this module.</p>
        <p className="text-garage-yellow font-bold mb-6">You have {profile.xp} XP.</p>
        <Link to="/modules" className="btn-primary">← Back to Modules</Link>
      </div>
    );
  }

  const handleCompleteLesson = (lesson: Lesson) => {
    const updated = onCompleteLesson(lesson.id, lesson.xpReward);
    const allDone = module.lessons.every(l =>
      l.id === lesson.id || updated.completedLessons.includes(l.id)
    );
    if (allDone && activeLesson < module.lessons.length - 1) {
      setTimeout(() => setActiveLesson(i => i + 1), 400);
    } else if (allDone) {
      setTimeout(() => setShowQuiz(true), 400);
    } else if (activeLesson < module.lessons.length - 1) {
      setTimeout(() => setActiveLesson(i => i + 1), 400);
    }
  };

  const handleQuizComplete = (score: number, total: number) => {
    onSubmitQuiz(module.id, score, total);
    setQuizCompleted(true);
    if (!moduleCompleted) {
      setTimeout(() => {
        onCompleteModule(module.id, module.badge.id);
        setModuleCompleted(true);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back + header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/modules" className="text-gray-400 hover:text-white font-bold flex items-center gap-1">
          ← Modules
        </Link>
        <span className="text-gray-600">/</span>
        <span className="font-bold text-white">{module.emoji} {module.title}</span>
      </div>

      {/* Module hero */}
      <div
        className="rounded-2xl p-5 mb-6 border border-white/10"
        style={{ backgroundColor: `${module.bgColor}` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{module.emoji}</span>
          <div>
            <div className="text-xs text-white/60 font-bold uppercase tracking-widest">Level {module.level}</div>
            <h1 className="text-2xl font-black text-white">{module.title}</h1>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar: lesson list */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Lessons</div>
          {module.lessons.map((lesson, i) => {
            const done = profile.completedLessons.includes(lesson.id);
            const active = activeLesson === i && !showQuiz;
            return (
              <button
                key={lesson.id}
                onClick={() => { setActiveLesson(i); setShowQuiz(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold transition-all text-sm border ${
                  active
                    ? 'bg-garage-yellow text-garage-dark border-garage-yellow'
                    : done
                      ? 'bg-green-900/40 text-green-300 border-green-700 hover:border-green-500'
                      : 'text-gray-400 border-garage-lightgrey hover:border-white hover:text-white'
                }`}
              >
                <span className="mr-2">{done ? '✅' : lesson.emoji}</span>
                {lesson.title}
              </button>
            );
          })}

          {/* Quiz button */}
          <button
            onClick={() => setShowQuiz(true)}
            className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold transition-all text-sm border mt-2 ${
              showQuiz
                ? 'bg-garage-yellow text-garage-dark border-garage-yellow'
                : quizCompleted
                  ? 'bg-yellow-900/40 text-yellow-300 border-yellow-700'
                  : 'text-gray-400 border-dashed border-garage-lightgrey hover:border-white hover:text-white'
            }`}
          >
            <span className="mr-2">{quizCompleted ? '⭐' : '📝'}</span>
            Module Quiz
          </button>

          {/* Badge preview */}
          <div className="mt-4 card-dark text-center">
            <div className="text-3xl mb-1">{module.badge.emoji}</div>
            <div className="text-sm font-black text-garage-yellow">{module.badge.name}</div>
            <div className="text-xs text-gray-500 mt-1">{module.badge.description}</div>
            {moduleCompleted && (
              <div className="mt-2 text-green-400 font-bold text-xs">✅ EARNED!</div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div>
          <AnimatePresence mode="wait">
            {showQuiz ? (
              <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {quizCompleted ? (
                  <div className="card-dark text-center py-8">
                    <div className="text-5xl mb-3">⭐</div>
                    <h3 className="text-2xl font-black text-garage-yellow mb-2">Quiz Already Completed!</h3>
                    <p className="text-gray-300 mb-2">
                      Your score: <span className="font-black text-white">{profile.quizScores[module.id]}/{module.quiz.length}</span>
                    </p>
                    <button onClick={() => { setQuizCompleted(false); }} className="btn-ghost mt-4">
                      🔄 Retake Quiz
                    </button>
                  </div>
                ) : (
                  <QuizArena
                    questions={module.quiz}
                    moduleTitle={module.title}
                    onComplete={handleQuizComplete}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div key={activeLesson} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <LessonView
                  lesson={module.lessons[activeLesson]}
                  alreadyDone={profile.completedLessons.includes(module.lessons[activeLesson].id)}
                  onComplete={() => handleCompleteLesson(module.lessons[activeLesson])}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
