import { useState } from 'react';
import { motion } from 'framer-motion';

interface CarOption {
  id: string;
  name: string;
  emoji: string;
  stat: number;
  description: string;
}

interface CarConfig {
  engine: CarOption;
  tyres: CarOption;
  body: CarOption;
  colour: string;
}

const ENGINES: CarOption[] = [
  { id: 'small', name: 'Small Petrol', emoji: '⛽', stat: 40, description: 'Efficient and cheap to run. Perfect for city driving.' },
  { id: 'big', name: 'Big V8', emoji: '🔥', stat: 90, description: 'Roaring power! Lots of fun but thirsty on fuel.' },
  { id: 'turbo', name: 'Turbo Sport', emoji: '💨', stat: 75, description: 'Turbocharged for extra power without wasting fuel.' },
  { id: 'electric', name: 'Electric Motor', emoji: '⚡', stat: 85, description: 'Silent, instant power, zero emissions. The future!' },
  { id: 'hybrid', name: 'Hybrid', emoji: '🔋', stat: 65, description: 'Best of both worlds — petrol + electric together.' },
];

const TYRES: CarOption[] = [
  { id: 'standard', name: 'Standard Road', emoji: '🛞', stat: 50, description: 'Comfy everyday tyres for normal roads.' },
  { id: 'sport', name: 'Sport Tyres', emoji: '🏎️', stat: 80, description: 'Wide and grippy for fast cornering. Wear faster.' },
  { id: 'off-road', name: 'Off-Road', emoji: '🪨', stat: 70, description: 'Deep tread for mud, gravel and rough terrain.' },
  { id: 'slick', name: 'Racing Slicks', emoji: '🏁', stat: 95, description: 'No tread at all! Max grip on dry racing circuits only.' },
];

const BODIES: CarOption[] = [
  { id: 'hatch', name: 'Hatchback', emoji: '🚗', stat: 60, description: 'Practical and common. Good boot space.' },
  { id: 'sports', name: 'Sports Coupe', emoji: '🏎️', stat: 85, description: 'Sleek and aerodynamic. Built for speed!' },
  { id: 'suv', name: 'SUV', emoji: '🚙', stat: 55, description: 'Tall and roomy. Great for families and rough tracks.' },
  { id: 'formula', name: 'Formula Car', emoji: '🏁', stat: 98, description: 'Open-wheel racing machine. No roof, no mercy!' },
];

const COLOURS = [
  '#E53E3E', '#ED8936', '#F6E05E', '#48BB78', '#4299E1', '#9F7AEA', '#FC8181', '#FFFFFF', '#1A1A2E',
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400 font-semibold">{label}</span>
        <span className="font-bold text-white">{value}/100</span>
      </div>
      <div className="h-3 bg-garage-lightgrey rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function OptionRow({ options, selected, onSelect }: {
  options: CarOption[];
  selected: CarOption;
  onSelect: (o: CarOption) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {options.map(opt => (
        <motion.button
          key={opt.id}
          onClick={() => onSelect(opt)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`p-3 rounded-xl border-2 text-center transition-all ${
            selected.id === opt.id
              ? 'border-garage-yellow bg-garage-yellow/20 text-white'
              : 'border-garage-lightgrey text-gray-300 hover:border-white'
          }`}
        >
          <div className="text-2xl mb-1">{opt.emoji}</div>
          <div className="text-xs font-bold leading-tight">{opt.name}</div>
        </motion.button>
      ))}
    </div>
  );
}

export default function BuildACar() {
  const [config, setConfig] = useState<CarConfig>({
    engine: ENGINES[0],
    tyres: TYRES[0],
    body: BODIES[0],
    colour: COLOURS[0],
  });
  const [built, setBuilt] = useState(false);
  const [activeTab, setActiveTab] = useState<'engine' | 'tyres' | 'body' | 'colour'>('engine');

  const speed = Math.round((config.engine.stat * 0.5 + config.tyres.stat * 0.3 + config.body.stat * 0.2));
  const handling = Math.round((config.tyres.stat * 0.5 + config.body.stat * 0.3 + config.engine.stat * 0.2));
  const efficiency = Math.round((100 - config.engine.stat * 0.4 + config.tyres.stat * 0.2 + config.body.stat * 0.1));
  const overall = Math.round((speed + handling + efficiency) / 3);

  return (
    <div className="card-dark">
      <h3 className="text-xl font-black text-garage-yellow mb-1">🚗 Build-a-Car</h3>
      <p className="text-gray-400 text-sm mb-4">Customise your dream car and see the stats!</p>

      {/* Car Preview */}
      <div className="bg-garage-dark rounded-2xl p-6 mb-5 flex items-center justify-center min-h-[140px] relative overflow-hidden">
        {/* Road */}
        <div className="absolute bottom-3 left-0 right-0 h-1 bg-garage-lightgrey opacity-30" />

        <motion.div
          key={config.body.id + config.colour}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative"
        >
          {/* Car body SVG */}
          <svg width="200" height="90" viewBox="0 0 200 90">
            {/* Shadow */}
            <ellipse cx="100" cy="83" rx="70" ry="5" fill="rgba(0,0,0,0.4)" />
            {/* Car body */}
            <path
              d={config.body.id === 'formula'
                ? "M20 60 L30 45 L80 35 L120 35 L170 45 L180 60 Z"
                : config.body.id === 'suv'
                  ? "M15 65 L15 35 L40 20 L160 20 L185 35 L185 65 Z"
                  : config.body.id === 'sports'
                    ? "M15 65 L25 45 L60 28 L140 28 L175 45 L185 65 Z"
                    : "M15 65 L20 40 L50 25 L150 25 L180 40 L185 65 Z"
              }
              fill={config.colour}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="1"
            />
            {/* Windows */}
            {config.body.id !== 'formula' && (
              <path
                d="M55 40 L75 27 L130 27 L155 40 Z"
                fill="rgba(147,197,253,0.7)"
                stroke="rgba(96,165,250,0.5)"
                strokeWidth="0.5"
              />
            )}
            {/* Wing for formula / spoiler for sports */}
            {config.body.id === 'formula' && (
              <>
                <rect x="15" y="57" width="20" height="4" rx="1" fill="#374151" />
                <rect x="165" y="57" width="20" height="4" rx="1" fill="#374151" />
              </>
            )}
            {config.body.id === 'sports' && (
              <rect x="155" y="55" width="25" height="4" rx="1" fill="#374151" />
            )}
            {/* Wheels */}
            {[40, 160].map(cx => (
              <g key={cx}>
                <circle cx={cx} cy="72" r="13" fill="#1F2937" stroke="#374151" strokeWidth="1.5" />
                <circle cx={cx} cy="72" r="8" fill="#374151" />
                <circle cx={cx} cy="72" r="3" fill="#9CA3AF" />
                {config.tyres.id === 'sport' && (
                  <circle cx={cx} cy="72" r="13" fill="none" stroke="#F6E05E" strokeWidth="1" opacity="0.5" />
                )}
              </g>
            ))}
            {/* Engine emoji indicator */}
            <text x="100" y="55" textAnchor="middle" fontSize="14">{config.engine.emoji}</text>
            {/* Exhaust */}
            <motion.circle
              cx="20" cy="62" r="3"
              fill="#718096"
              animate={{ opacity: [0.6, 0.1, 0.6], cx: [20, 10, 5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-garage-dark rounded-xl p-1">
        {(['engine', 'tyres', 'body', 'colour'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
              activeTab === tab ? 'bg-garage-red text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'engine' ? '⚙️' : tab === 'tyres' ? '🛞' : tab === 'body' ? '🚗' : '🎨'} {tab}
          </button>
        ))}
      </div>

      {/* Options */}
      <div className="mb-4">
        {activeTab === 'engine' && (
          <>
            <OptionRow options={ENGINES} selected={config.engine} onSelect={e => setConfig(c => ({ ...c, engine: e }))} />
            <p className="text-sm text-gray-400 mt-2 italic">{config.engine.description}</p>
          </>
        )}
        {activeTab === 'tyres' && (
          <>
            <OptionRow options={TYRES} selected={config.tyres} onSelect={t => setConfig(c => ({ ...c, tyres: t }))} />
            <p className="text-sm text-gray-400 mt-2 italic">{config.tyres.description}</p>
          </>
        )}
        {activeTab === 'body' && (
          <>
            <OptionRow options={BODIES} selected={config.body} onSelect={b => setConfig(c => ({ ...c, body: b }))} />
            <p className="text-sm text-gray-400 mt-2 italic">{config.body.description}</p>
          </>
        )}
        {activeTab === 'colour' && (
          <div className="flex flex-wrap gap-3">
            {COLOURS.map(col => (
              <button
                key={col}
                onClick={() => setConfig(c => ({ ...c, colour: col }))}
                className={`w-10 h-10 rounded-full border-4 transition-all ${
                  config.colour === col ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: col }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-garage-dark rounded-2xl p-4 space-y-3 mb-4">
        <h4 className="font-black text-white text-sm uppercase tracking-wide">Car Stats</h4>
        <StatBar label="🏎️ Speed" value={speed} color="#E53E3E" />
        <StatBar label="🔄 Handling" value={handling} color="#4299E1" />
        <StatBar label="⛽ Efficiency" value={Math.min(100, efficiency)} color="#48BB78" />
        <div className="border-t border-garage-grey pt-3">
          <StatBar label="⭐ Overall" value={overall} color="#F6E05E" />
        </div>
      </div>

      {!built ? (
        <button
          onClick={() => setBuilt(true)}
          className="btn-primary w-full"
        >
          🔧 Build This Car!
        </button>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-900 border-2 border-green-500 rounded-2xl p-4 text-center"
        >
          <div className="text-3xl mb-2">🎉</div>
          <div className="font-black text-green-300 text-lg">
            Your {config.body.name} with a {config.engine.name} engine is built!
          </div>
          <div className="text-gray-300 text-sm mt-1">Overall rating: {overall}/100</div>
          <button onClick={() => setBuilt(false)} className="btn-ghost mt-3 text-sm py-2 px-4">
            🔄 Build Another
          </button>
        </motion.div>
      )}
    </div>
  );
}
