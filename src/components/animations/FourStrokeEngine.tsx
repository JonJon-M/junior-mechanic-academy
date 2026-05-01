import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STROKES = [
  {
    name: 'INTAKE',
    emoji: '💨',
    color: '#4299E1',
    description: 'Piston moves DOWN. Air and fuel mixture is pulled into the cylinder.',
    pistonY: 70,
    inletOpen: true,
    exhaustOpen: false,
    showFuel: true,
    showFire: false,
    showExhaust: false,
  },
  {
    name: 'COMPRESSION',
    emoji: '💪',
    color: '#ED8936',
    description: 'Piston moves UP, squeezing the mixture into a tiny space — like squeezing a spring!',
    pistonY: 20,
    inletOpen: false,
    exhaustOpen: false,
    showFuel: true,
    showFire: false,
    showExhaust: false,
  },
  {
    name: 'COMBUSTION',
    emoji: '🔥',
    color: '#E53E3E',
    description: 'BANG! Spark plug fires. Explosion forces piston DOWN — this is the power stroke!',
    pistonY: 70,
    inletOpen: false,
    exhaustOpen: false,
    showFuel: false,
    showFire: true,
    showExhaust: false,
  },
  {
    name: 'EXHAUST',
    emoji: '💨',
    color: '#718096',
    description: 'Piston moves UP again. Exhaust valve opens, pushing burnt gases out.',
    pistonY: 20,
    inletOpen: false,
    exhaustOpen: true,
    showFuel: false,
    showFire: false,
    showExhaust: true,
  },
];

export default function FourStrokeEngine() {
  const [stroke, setStroke] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = STROKES[stroke];

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      setStroke(s => (s + 1) % 4);
    }, 1800);
    return () => clearInterval(t);
  }, [isPlaying]);

  return (
    <div className="card-dark flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 self-start w-full justify-between flex-wrap">
        <h3 className="text-xl font-black text-garage-yellow">4-Stroke Engine Cycle</h3>
        <button
          onClick={() => setIsPlaying(p => !p)}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            isPlaying ? 'bg-garage-red text-white' : 'btn-secondary'
          }`}
        >
          {isPlaying ? '⏸ Pause' : '▶ Animate'}
        </button>
      </div>

      {/* Step buttons */}
      <div className="flex gap-2 w-full flex-wrap">
        {STROKES.map((s, i) => (
          <button
            key={i}
            onClick={() => { setStroke(i); setIsPlaying(false); }}
            className={`flex-1 min-w-[60px] py-2 px-3 rounded-xl font-bold text-sm transition-all border-2 ${
              stroke === i
                ? 'text-white border-transparent'
                : 'text-gray-400 border-garage-lightgrey hover:border-white hover:text-white'
            }`}
            style={stroke === i ? { backgroundColor: s.color, borderColor: s.color } : {}}
          >
            {i + 1}. {s.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center w-full">
        {/* SVG Engine Diagram */}
        <div className="relative shrink-0">
          <svg width="160" height="220" viewBox="0 0 160 220" className="overflow-visible">
            {/* Cylinder walls */}
            <rect x="40" y="10" width="80" height="160" rx="4" fill="#2D3748" stroke="#4A5568" strokeWidth="3" />

            {/* Fuel/air mixture */}
            {current.showFuel && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={55 + (i % 3) * 20}
                    cy={30 + Math.floor(i / 3) * 20}
                    r="4"
                    fill="#4299E1"
                    opacity="0.7"
                    animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.g>
            )}

            {/* Fire/explosion */}
            {current.showFire && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.circle
                  cx="80" cy="35"
                  r="25"
                  fill="#E53E3E"
                  opacity="0.8"
                  animate={{ r: [25, 30, 22, 28, 25], opacity: [0.8, 1, 0.6, 0.9, 0.8] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="80" cy="35"
                  r="16"
                  fill="#F6E05E"
                  opacity="0.9"
                  animate={{ r: [16, 20, 13, 17, 16] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                />
                <text x="80" y="42" textAnchor="middle" fontSize="18">🔥</text>
              </motion.g>
            )}

            {/* Exhaust smoke */}
            {current.showExhaust && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={60 + i * 12}
                    cy={35}
                    r="6"
                    fill="#718096"
                    animate={{
                      y: [-5, -20, -35],
                      opacity: [0.8, 0.4, 0],
                      scale: [0.5, 1, 1.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </>
            )}

            {/* Piston */}
            <motion.g
              animate={{ y: current.pistonY - 20 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <rect x="42" y="100" width="76" height="28" rx="3" fill="#4A5568" stroke="#718096" strokeWidth="2" />
              <rect x="55" y="104" width="50" height="5" rx="2" fill="#2D3748" />
              <rect x="55" y="113" width="50" height="5" rx="2" fill="#2D3748" />
              {/* Connecting rod */}
              <line x1="80" y1="128" x2="80" y2="180" stroke="#718096" strokeWidth="6" strokeLinecap="round" />
              {/* Crankshaft */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '80px 185px' }}
              >
                <circle cx="80" cy="185" r="18" fill="none" stroke="#4A5568" strokeWidth="4" />
                <line x1="80" y1="167" x2="80" y2="203" stroke="#718096" strokeWidth="5" />
                <circle cx="80" cy="167" r="5" fill="#ED8936" />
              </motion.g>
            </motion.g>

            {/* Inlet valve (left side) */}
            <motion.rect
              x="28" y="28"
              width="12" height="16"
              rx="3"
              animate={{ fill: current.inletOpen ? '#48BB78' : '#E53E3E' }}
              transition={{ duration: 0.3 }}
            />
            <text x="10" y="42" fontSize="8" fill="#9CA3AF" textAnchor="middle">IN</text>

            {/* Exhaust valve (right side) */}
            <motion.rect
              x="120" y="28"
              width="12" height="16"
              rx="3"
              animate={{ fill: current.exhaustOpen ? '#48BB78' : '#E53E3E' }}
              transition={{ duration: 0.3 }}
            />
            <text x="150" y="42" fontSize="8" fill="#9CA3AF" textAnchor="middle">OUT</text>

            {/* Spark plug */}
            <rect x="73" y="6" width="14" height="10" rx="2" fill="#F6E05E" />
            {current.name === 'COMBUSTION' && (
              <motion.g
                animate={{ opacity: [1, 0, 1, 0, 1] }}
                transition={{ duration: 0.15, repeat: 3 }}
              >
                <line x1="80" y1="16" x2="75" y2="22" stroke="#F6E05E" strokeWidth="2" />
                <line x1="80" y1="16" x2="85" y2="22" stroke="#F6E05E" strokeWidth="2" />
              </motion.g>
            )}
            <text x="80" y="8" fontSize="7" fill="#2D3748" fontWeight="bold" textAnchor="middle">⚡</text>

            {/* Labels */}
            <text x="80" y="210" textAnchor="middle" fontSize="9" fill="#9CA3AF">Crankshaft</text>
          </svg>
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stroke}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div
              className="rounded-2xl p-4 border-2 mb-3"
              style={{ borderColor: current.color, backgroundColor: `${current.color}20` }}
            >
              <div className="text-2xl font-black mb-1" style={{ color: current.color }}>
                {current.emoji} Stroke {stroke + 1}: {current.name}
              </div>
              <p className="text-gray-200 text-lg leading-relaxed">{current.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className={`rounded-xl p-2 text-center font-bold ${
                current.inletOpen ? 'bg-green-800 text-green-200' : 'bg-garage-grey text-gray-400'
              }`}>
                Inlet Valve: {current.inletOpen ? '🟢 OPEN' : '🔴 CLOSED'}
              </div>
              <div className={`rounded-xl p-2 text-center font-bold ${
                current.exhaustOpen ? 'bg-green-800 text-green-200' : 'bg-garage-grey text-gray-400'
              }`}>
                Exhaust Valve: {current.exhaustOpen ? '🟢 OPEN' : '🔴 CLOSED'}
              </div>
            </div>

            <div className="mt-3 flex justify-center gap-2">
              {STROKES.map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{ backgroundColor: i === stroke ? current.color : '#4A5568' }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
