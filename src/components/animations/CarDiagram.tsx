import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Part {
  id: string;
  label: string;
  emoji: string;
  x: number;
  y: number;
  description: string;
}

const PARTS: Part[] = [
  { id: 'engine', label: 'Engine', emoji: '⚙️', x: 42, y: 38, description: 'The heart of the car! Burns fuel to create power that moves the wheels.' },
  { id: 'battery', label: 'Battery', emoji: '🔋', x: 62, y: 30, description: 'Stores electricity to start the car and power electronics.' },
  { id: 'radiator', label: 'Radiator', emoji: '💧', x: 22, y: 38, description: 'Cools the engine by releasing heat into the air flowing through it.' },
  { id: 'exhaust', label: 'Exhaust', emoji: '💨', x: 75, y: 58, description: 'Pipes burnt gases safely out of the engine and away from the car.' },
  { id: 'tyres', label: 'Tyres', emoji: '🛞', x: 22, y: 62, description: 'Rubber rings that grip the road. They transfer engine power to movement.' },
  { id: 'fuel-tank', label: 'Fuel Tank', emoji: '⛽', x: 68, y: 55, description: 'Stores the petrol or diesel that feeds the engine.' },
  { id: 'brakes', label: 'Brakes', emoji: '🛑', x: 30, y: 55, description: 'Disc or drum systems that slow the car down safely.' },
  { id: 'steering', label: 'Steering', emoji: '🎯', x: 50, y: 28, description: 'Rack and pinion system that turns the front wheels when you rotate the steering wheel.' },
];

export default function CarDiagram() {
  const [selected, setSelected] = useState<Part | null>(null);

  return (
    <div className="card-dark">
      <h3 className="text-xl font-black text-garage-yellow mb-2">Interactive Car Diagram</h3>
      <p className="text-gray-400 text-sm mb-4">Click on any part to learn what it does! 👇</p>

      <div className="relative w-full" style={{ paddingTop: '45%' }}>
        {/* Car SVG Body */}
        <svg
          viewBox="0 0 100 50"
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
        >
          {/* Road */}
          <rect x="0" y="44" width="100" height="6" fill="#1A1A2E" />
          <rect x="0" y="44" width="100" height="1" fill="#374151" />
          {[0, 15, 30, 45, 60, 75].map(x => (
            <rect key={x} x={x + 5} y="46" width="8" height="1.5" rx="0.5" fill="#4B5563" />
          ))}

          {/* Car body */}
          <path d="M10 40 L10 30 L20 22 L38 20 L62 20 L75 28 L90 30 L90 40 Z"
            fill="#E53E3E" stroke="#B91C1C" strokeWidth="0.5" />

          {/* Windows */}
          <path d="M22 28 L36 22 L48 22 L48 30 L22 30 Z" fill="#93C5FD" opacity="0.8" stroke="#60A5FA" strokeWidth="0.5" />
          <path d="M50 22 L60 22 L68 28 L68 30 L50 30 Z" fill="#93C5FD" opacity="0.8" stroke="#60A5FA" strokeWidth="0.5" />

          {/* Wheels */}
          <circle cx="28" cy="41" r="7" fill="#1F2937" stroke="#374151" strokeWidth="1.5" />
          <circle cx="28" cy="41" r="4" fill="#374151" stroke="#4B5563" strokeWidth="0.8" />
          <circle cx="28" cy="41" r="1.5" fill="#9CA3AF" />

          <circle cx="72" cy="41" r="7" fill="#1F2937" stroke="#374151" strokeWidth="1.5" />
          <circle cx="72" cy="41" r="4" fill="#374151" stroke="#4B5563" strokeWidth="0.8" />
          <circle cx="72" cy="41" r="1.5" fill="#9CA3AF" />

          {/* Headlight */}
          <ellipse cx="89" cy="33" rx="3" ry="2" fill="#FEF08A" opacity="0.9" />

          {/* Exhaust */}
          <rect x="10" y="38" width="5" height="1.5" rx="0.5" fill="#374151" />

          {/* Clickable parts */}
          {PARTS.map(part => (
            <motion.g
              key={part.id}
              onClick={() => setSelected(selected?.id === part.id ? null : part)}
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.4 }}
            >
              <circle
                cx={part.x} cy={part.y}
                r="5"
                fill={selected?.id === part.id ? '#F6E05E' : '#1F2937'}
                stroke={selected?.id === part.id ? '#F6E05E' : '#4A5568'}
                strokeWidth="0.8"
                opacity="0.9"
              />
              <text x={part.x} y={part.y + 1.5} textAnchor="middle" fontSize="4" dominantBaseline="middle">
                {part.emoji}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 bg-garage-dark rounded-2xl p-4 border border-garage-yellow overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{selected.emoji}</span>
              <span className="font-black text-garage-yellow text-lg">{selected.label}</span>
            </div>
            <p className="text-gray-200">{selected.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 flex flex-wrap gap-2">
        {PARTS.map(part => (
          <button
            key={part.id}
            onClick={() => setSelected(selected?.id === part.id ? null : part)}
            className={`text-xs px-2 py-1 rounded-lg font-bold transition-all border ${
              selected?.id === part.id
                ? 'bg-garage-yellow text-garage-dark border-garage-yellow'
                : 'text-gray-400 border-garage-lightgrey hover:border-white hover:text-white'
            }`}
          >
            {part.emoji} {part.label}
          </button>
        ))}
      </div>
    </div>
  );
}
