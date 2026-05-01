import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '../../data/modules';

interface Props {
  questions: QuizQuestion[];
  moduleTitle: string;
  onComplete: (score: number, total: number) => void;
  xpPerQuestion?: number;
}

type Phase = 'question' | 'feedback' | 'complete';

export default function QuizArena({ questions, moduleTitle, onComplete, xpPerQuestion = 20 }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [timeLeft, setTimeLeft] = useState(20);
  const [timedOut, setTimedOut] = useState(false);
  const [streak, setStreak] = useState(0);

  const q = questions[current];

  const handleTimeout = useCallback(() => {
    if (phase !== 'question') return;
    setTimedOut(true);
    setPhase('feedback');
    setStreak(0);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'question') return;
    setTimeLeft(20);
    setTimedOut(false);
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleTimeout(); clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [current, phase]); // eslint-disable-line

  const handleAnswer = (idx: number) => {
    if (phase !== 'question') return;
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setPhase('feedback');
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setPhase('complete');
      onComplete(score + (selected === q.correct ? 1 : 0), questions.length);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setPhase('question');
    }
  };

  const finalScore = score;

  if (phase === 'complete') {
    const pct = Math.round((finalScore / questions.length) * 100);
    const grade = pct >= 80 ? '⭐ Excellent!' : pct >= 60 ? '👍 Good job!' : '💪 Keep practising!';
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card-dark text-center py-8"
      >
        <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '📚'}</div>
        <h2 className="text-3xl font-black text-garage-yellow mb-2">Quiz Complete!</h2>
        <p className="text-xl text-gray-300 mb-6">{moduleTitle}</p>
        <div className="text-5xl font-black mb-2" style={{ color: pct >= 80 ? '#48BB78' : pct >= 60 ? '#ED8936' : '#E53E3E' }}>
          {finalScore}/{questions.length}
        </div>
        <div className="text-xl text-gray-300 mb-2">{pct}% Correct</div>
        <div className="text-2xl mb-6">{grade}</div>
        <div className="bg-garage-grey rounded-2xl p-4 mb-6 inline-block">
          <div className="text-garage-yellow font-bold">XP Earned</div>
          <div className="text-3xl font-black text-white">+{finalScore * xpPerQuestion}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="card-dark">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-gray-400">
          Question {current + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-sm font-bold text-garage-orange"
            >
              🔥 {streak} streak!
            </motion.span>
          )}
          <span className="font-bold text-white">Score: {score}</span>
          {/* Timer */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-2 transition-colors ${
            timeLeft <= 5 ? 'border-red-500 text-red-400 animate-pulse' : 'border-garage-yellow text-garage-yellow'
          }`}>
            {phase === 'question' ? timeLeft : '✓'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-garage-lightgrey rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-garage-yellow rounded-full transition-all duration-300"
          style={{ width: `${((current) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Question */}
          <h3 className="text-xl font-black text-white mb-5 leading-relaxed">{q.question}</h3>

          {/* Options */}
          <div className="grid gap-3 mb-5">
            {q.options.map((opt, i) => {
              let style = 'border-garage-lightgrey text-white hover:border-white hover:bg-garage-grey';
              if (phase === 'feedback') {
                if (i === q.correct) style = 'border-green-400 bg-green-800 text-white';
                else if (i === selected && i !== q.correct) style = 'border-red-400 bg-red-900 text-white';
                else style = 'border-garage-lightgrey text-gray-500 opacity-50';
              }
              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={phase !== 'question'}
                  whileHover={phase === 'question' ? { scale: 1.01 } : {}}
                  whileTap={phase === 'question' ? { scale: 0.99 } : {}}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-lg
                             transition-all duration-200 ${style} disabled:cursor-default`}
                >
                  <span className="font-black text-garage-yellow mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {phase === 'feedback' && i === q.correct && (
                    <span className="float-right text-green-400">✓</span>
                  )}
                  {phase === 'feedback' && i === selected && i !== q.correct && (
                    <span className="float-right text-red-400">✗</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback panel */}
          <AnimatePresence>
            {phase === 'feedback' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`rounded-2xl p-4 mb-4 border-2 ${
                  timedOut ? 'bg-yellow-900 border-yellow-500' :
                  selected === q.correct ? 'bg-green-900 border-green-500' : 'bg-red-900 border-red-500'
                }`}
              >
                <div className="font-black text-lg mb-1">
                  {timedOut ? '⏰ Time\'s up!' : selected === q.correct ? '🎉 Correct!' : '❌ Not quite!'}
                </div>
                <p className="text-gray-200">{q.explanation}</p>
                {!timedOut && selected === q.correct && (
                  <div className="mt-2 text-green-300 font-bold">+{xpPerQuestion} XP {streak >= 2 ? `🔥 (${streak} streak!)` : ''}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {phase === 'feedback' && (
            <button
              onClick={next}
              className="btn-primary w-full"
            >
              {current + 1 >= questions.length ? '🏆 See Results' : 'Next Question →'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
