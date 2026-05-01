import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULES } from '../data/modules';
import type { PlayerProfile } from '../hooks/useProgress';
import QuizArena from '../components/activities/QuizArena';
import DiagnosisChallenge from '../components/activities/DiagnosisChallenge';
import WorkshopSimulator from '../components/activities/WorkshopSimulator';
import BuildACar from '../components/activities/BuildACar';

type Activity = 'menu' | 'quiz' | 'diagnosis' | 'workshop' | 'buildacar';

interface Props {
  profile?: PlayerProfile;
  onCompleteWorkshop: () => void;
  onCompleteDiagnosis: () => void;
  onSubmitQuiz: (moduleId: string, score: number, total: number) => void;
}

// All quiz questions combined
const ALL_QUESTIONS = MODULES.flatMap(m => m.quiz).sort(() => Math.random() - 0.5).slice(0, 10);

export default function ActivitiesPage({ onCompleteWorkshop, onCompleteDiagnosis, onSubmitQuiz }: Props) {
  const [active, setActive] = useState<Activity>('menu');
  const [quizDone, setQuizDone] = useState(false);
  const [diagDone, setDiagDone] = useState(false);
  const [workshopDone, setWorkshopDone] = useState(false);

  const handleQuizComplete = (score: number, total: number) => {
    onSubmitQuiz('quiz-arena', score, total);
    setQuizDone(true);
  };

  const handleDiagComplete = () => {
    onCompleteDiagnosis();
    setDiagDone(true);
  };

  const handleWorkshopComplete = () => {
    onCompleteWorkshop();
    setWorkshopDone(true);
  };

  const activities = [
    {
      id: 'quiz' as Activity,
      title: 'Quiz Arena',
      emoji: '🎯',
      description: 'Test your knowledge with timed multiple-choice questions from all modules! Beat the clock for bonus XP.',
      xp: '+200 XP',
      color: '#E53E3E',
      bg: '#742A2A',
      done: quizDone,
    },
    {
      id: 'workshop' as Activity,
      title: 'Engine Assembly Workshop',
      emoji: '🔧',
      description: 'Drag and place engine parts into the correct slots to assemble a working engine. How many mistakes can you avoid?',
      xp: '+100 XP',
      color: '#ED8936',
      bg: '#7B341E',
      done: workshopDone,
    },
    {
      id: 'diagnosis' as Activity,
      title: 'Diagnosis Challenge',
      emoji: '🩺',
      description: 'Read the symptoms, play junior mechanic and figure out what\'s wrong with each car! Can you diagnose all 5 cases?',
      xp: '+150 XP',
      color: '#4299E1',
      bg: '#2A4365',
      done: diagDone,
    },
    {
      id: 'buildacar' as Activity,
      title: 'Build-a-Car',
      emoji: '🚗',
      description: 'Choose your engine, tyres, and body style to build your dream car! See how your choices affect the stats.',
      xp: 'Free!',
      color: '#9F7AEA',
      bg: '#44337A',
      done: false,
    },
  ];

  if (active !== 'menu') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setActive('menu')}
          className="text-gray-400 hover:text-white font-bold flex items-center gap-1 mb-6"
        >
          ← Back to Activities
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {active === 'quiz' && (
              <>
                <div className="mb-5">
                  <h1 className="text-3xl font-black text-white">🎯 Quiz Arena</h1>
                  <p className="text-gray-400">10 questions from all modules. You have 20 seconds per question!</p>
                </div>
                {quizDone ? (
                  <div className="card-dark text-center py-8">
                    <div className="text-5xl mb-3">🎯</div>
                    <h3 className="text-2xl font-black text-garage-yellow mb-3">Nice work!</h3>
                    <p className="text-gray-300 mb-6">Come back tomorrow for a fresh set of questions!</p>
                    <button onClick={() => { setQuizDone(false); }} className="btn-ghost">
                      🔄 Play Again
                    </button>
                  </div>
                ) : (
                  <QuizArena
                    questions={ALL_QUESTIONS}
                    moduleTitle="All Modules"
                    onComplete={handleQuizComplete}
                    xpPerQuestion={20}
                  />
                )}
              </>
            )}
            {active === 'workshop' && (
              <>
                <div className="mb-5">
                  <h1 className="text-3xl font-black text-white">🔧 Engine Assembly</h1>
                  <p className="text-gray-400">Select a part from the bin, then click where it belongs in the engine!</p>
                </div>
                <WorkshopSimulator onComplete={handleWorkshopComplete} />
              </>
            )}
            {active === 'diagnosis' && (
              <>
                <div className="mb-5">
                  <h1 className="text-3xl font-black text-white">🩺 Diagnosis Challenge</h1>
                  <p className="text-gray-400">Read the clues carefully and identify what's wrong with each car!</p>
                </div>
                <DiagnosisChallenge onComplete={handleDiagComplete} />
              </>
            )}
            {active === 'buildacar' && (
              <>
                <div className="mb-5">
                  <h1 className="text-3xl font-black text-white">🚗 Build-a-Car</h1>
                  <p className="text-gray-400">Customise every part and see how your choices affect the performance!</p>
                </div>
                <BuildACar />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-white mb-1">🎮 Activities</h1>
        <p className="text-gray-400 mb-6">
          Learn by doing! Each activity earns you XP and helps you understand cars better.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {activities.map((act, i) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.button
              onClick={() => setActive(act.id)}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left rounded-3xl overflow-hidden border-2 border-garage-lightgrey
                         hover:border-white transition-all"
            >
              {/* Header */}
              <div className="p-6" style={{ backgroundColor: act.bg }}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-5xl">{act.emoji}</span>
                    <h3 className="text-xl font-black text-white mt-2">{act.title}</h3>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-sm font-black px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${act.color}40`, color: act.color, border: `1px solid ${act.color}` }}
                    >
                      {act.xp}
                    </span>
                    {act.done && (
                      <div className="text-green-400 text-xs font-bold mt-1">✅ Completed</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="bg-garage-grey p-5">
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{act.description}</p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
                  style={{ backgroundColor: `${act.color}20`, color: act.color, border: `1px solid ${act.color}` }}
                >
                  {act.done ? '🔄 Play Again' : '▶ Start Activity'} →
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
