import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
  id: string;
  title: string;
  symptoms: string[];
  options: string[];
  correct: number;
  explanation: string;
  emoji: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: "The car won't start!",
    emoji: '🔑',
    symptoms: [
      'You turn the key but nothing happens',
      'The dashboard lights come on normally',
      'No clicking sound, no engine cranking',
      'All other electronics work fine',
    ],
    options: [
      'Engine oil is low',
      'The starter motor or ignition switch has failed',
      'Flat tyre',
      'Overheating engine',
    ],
    correct: 1,
    explanation: 'If the battery and electronics are fine but nothing happens when you turn the key, the starter motor (which cranks the engine to start it) or ignition switch has most likely failed. The starter motor gets the engine turning so combustion can begin!',
  },
  {
    id: 'c2',
    title: 'The engine is overheating!',
    emoji: '🌡️',
    symptoms: [
      'Temperature gauge is in the red zone',
      'Steam coming from under the bonnet',
      'Sweet smell (like syrup) from the engine bay',
      'The heater blows cold air instead of hot',
    ],
    options: [
      'Flat battery',
      'Worn brake pads',
      'Coolant leak — the cooling system has lost fluid',
      'Dirty air filter',
    ],
    correct: 2,
    explanation: 'Steam from the bonnet, sweet smell (coolant/antifreeze has a sweet smell), and the heater blowing cold are classic signs of a coolant leak. When coolant level drops too low, the engine can\'t cool itself and overheats. The heater also uses the cooling system, which is why it blows cold when coolant is low!',
  },
  {
    id: 'c3',
    title: 'Strange pulling to one side!',
    emoji: '↔️',
    symptoms: [
      'Car pulls strongly to the left when driving',
      'Steering wheel vibrates at motorway speeds',
      'Uneven tyre wear (one side worn more than other)',
      'Had a minor kerb impact last week',
    ],
    options: [
      'Low engine oil',
      'Dirty spark plugs',
      'Wheel alignment is off — possibly bent by kerbing',
      'Faulty alternator',
    ],
    correct: 2,
    explanation: 'Pulling to one side, vibration, and uneven tyre wear after hitting a kerb are clear signs of wheel alignment problems. When you hit a kerb, it can knock the suspension geometry out of alignment. A garage uses a special machine to precisely realign the wheels so they all point in exactly the right direction!',
  },
  {
    id: 'c4',
    title: 'The car uses too much fuel!',
    emoji: '⛽',
    symptoms: [
      'Fuel runs out much faster than before',
      'Black smoke from the exhaust',
      'Engine feels sluggish and lacks power',
      'Check engine light is on',
    ],
    options: [
      'Tyres need rotating',
      'Clogged air filter — engine is getting too much fuel, not enough air',
      'The horn is broken',
      'Windscreen wipers need replacing',
    ],
    correct: 1,
    explanation: 'Black smoke, poor power, high fuel consumption and a check engine light often point to a rich fuel mixture — the engine is burning too much fuel. A clogged air filter restricts airflow, so the engine computer injects extra fuel to compensate, causing black smoke and poor economy. Replacing the cheap air filter can fix this instantly!',
  },
  {
    id: 'c5',
    title: 'Grinding noise when braking!',
    emoji: '🛑',
    symptoms: [
      'Loud metal-on-metal grinding when brakes applied',
      'Car takes longer to stop than normal',
      'Brake pedal feels soft and spongy',
      'Problem started gradually over several weeks',
    ],
    options: [
      'Engine needs oil change',
      'GPS antenna is faulty',
      'Worn-out brake pads and possible brake fluid leak',
      'Flat spare tyre',
    ],
    correct: 2,
    explanation: 'Grinding brakes + longer stopping distance + spongy pedal is a serious warning. The grinding means brake pads have worn to bare metal (dangerous!). The spongy pedal suggests a possible brake fluid leak (air in brake lines reduces pressure). This needs IMMEDIATE attention — it\'s a safety emergency. Do not drive until fixed!',
  },
];

interface Props {
  onComplete: () => void;
}

export default function DiagnosisChallenge({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<'question' | 'feedback' | 'complete'>('question');
  const [score, setScore] = useState(0);

  const challenge = CHALLENGES[current];

  const handleAnswer = (idx: number) => {
    if (phase !== 'question') return;
    setSelected(idx);
    if (idx === challenge.correct) setScore(s => s + 1);
    setPhase('feedback');
  };

  const next = () => {
    if (current + 1 >= CHALLENGES.length) {
      setPhase('complete');
      onComplete();
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setPhase('question');
    }
  };

  if (phase === 'complete') {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="card-dark text-center py-10">
        <div className="text-6xl mb-4">🩺</div>
        <h2 className="text-3xl font-black text-garage-yellow mb-2">Diagnosis Complete!</h2>
        <div className="text-5xl font-black text-white mb-2">{score}/{CHALLENGES.length}</div>
        <p className="text-xl text-gray-300 mb-4">
          {score >= 4 ? "You're a brilliant junior mechanic!" : score >= 3 ? "Great diagnostic skills!" : "Keep practising your diagnosis!"}
        </p>
        <div className="bg-garage-grey rounded-2xl p-4 inline-block mb-6">
          <div className="text-garage-yellow font-bold">XP Earned</div>
          <div className="text-3xl font-black">+{score * 20 + 50}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="card-dark">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-black text-garage-yellow">🩺 Diagnosis Challenge</h3>
        <span className="text-sm font-bold text-gray-400">{current + 1}/{CHALLENGES.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <div className="bg-garage-dark rounded-2xl p-5 mb-4 border border-garage-grey">
            <div className="text-3xl mb-2">{challenge.emoji}</div>
            <h4 className="text-xl font-black text-white mb-3">{challenge.title}</h4>
            <p className="text-sm font-bold text-garage-yellow mb-3 uppercase tracking-wide">Symptoms:</p>
            <ul className="space-y-1.5">
              {challenge.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-200">
                  <span className="text-garage-yellow shrink-0 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">What's the most likely problem?</p>

          <div className="grid gap-3 mb-4">
            {challenge.options.map((opt, i) => {
              let cls = 'border-garage-lightgrey text-white hover:border-white hover:bg-garage-grey';
              if (phase === 'feedback') {
                if (i === challenge.correct) cls = 'border-green-400 bg-green-800 text-white';
                else if (i === selected) cls = 'border-red-400 bg-red-900 text-white opacity-80';
                else cls = 'border-garage-lightgrey text-gray-500 opacity-40';
              }
              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={phase !== 'question'}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-5 py-3 rounded-xl border-2 font-semibold transition-all ${cls}`}
                >
                  <span className="font-black text-garage-yellow mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {phase === 'feedback' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-4 mb-4 border-2 ${
                  selected === challenge.correct
                    ? 'bg-green-900 border-green-500'
                    : 'bg-red-900 border-red-500'
                }`}
              >
                <div className="font-black text-lg mb-2">
                  {selected === challenge.correct ? '🎉 Correct diagnosis!' : '❌ Not quite right'}
                </div>
                <p className="text-gray-200 leading-relaxed">{challenge.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === 'feedback' && (
            <button onClick={next} className="btn-primary w-full">
              {current + 1 >= CHALLENGES.length ? '🏁 See Results' : 'Next Case →'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
