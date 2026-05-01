import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnginePart {
  id: string;
  name: string;
  emoji: string;
  description: string;
  correctSlot: number;
  placed: boolean;
}

const INITIAL_PARTS: EnginePart[] = [
  { id: 'block', name: 'Engine Block', emoji: '🔲', description: 'The main body — all other parts attach to this!', correctSlot: 0, placed: false },
  { id: 'pistons', name: 'Pistons', emoji: '⬆️', description: 'Move up and down inside the cylinders to create power.', correctSlot: 1, placed: false },
  { id: 'crankshaft', name: 'Crankshaft', emoji: '🔄', description: 'Converts the pistons\' up-down motion into rotation.', correctSlot: 2, placed: false },
  { id: 'cylinder-head', name: 'Cylinder Head', emoji: '🔝', description: 'Sits on top of the block, contains valves and combustion chambers.', correctSlot: 3, placed: false },
  { id: 'camshaft', name: 'Camshaft', emoji: '〰️', description: 'Controls when the valves open and close — perfectly timed!', correctSlot: 4, placed: false },
  { id: 'spark-plugs', name: 'Spark Plugs', emoji: '⚡', description: 'Create the spark that ignites the fuel mixture.', correctSlot: 5, placed: false },
  { id: 'oil-pan', name: 'Oil Pan', emoji: '🛢️', description: 'Sits at the bottom, stores the engine oil.', correctSlot: 6, placed: false },
  { id: 'timing-belt', name: 'Timing Belt', emoji: '➰', description: 'Keeps everything in sync — crankshaft and camshaft must be timed perfectly!', correctSlot: 7, placed: false },
];

const SLOTS = [
  { label: 'Engine Block', hint: 'Goes at the centre' },
  { label: 'Pistons', hint: 'Inside the cylinders' },
  { label: 'Crankshaft', hint: 'At the bottom' },
  { label: 'Cylinder Head', hint: 'Top of the block' },
  { label: 'Camshaft', hint: 'Controls valves' },
  { label: 'Spark Plugs', hint: 'In each cylinder' },
  { label: 'Oil Pan', hint: 'Underneath the engine' },
  { label: 'Timing Belt', hint: 'Connects cam to crank' },
];

interface Props {
  onComplete: () => void;
}

export default function WorkshopSimulator({ onComplete }: Props) {
  const [parts, setParts] = useState<EnginePart[]>(INITIAL_PARTS);
  const [slots, setSlots] = useState<(string | null)[]>(Array(8).fill(null));
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ slot: number; correct: boolean } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const handlePartClick = (partId: string) => {
    if (selected === partId) {
      setSelected(null);
    } else {
      setSelected(partId);
    }
    setFeedback(null);
  };

  const handleSlotClick = (slotIdx: number) => {
    if (!selected) return;
    if (slots[slotIdx] !== null) return;

    const part = parts.find(p => p.id === selected);
    if (!part) return;

    const correct = part.correctSlot === slotIdx;

    if (correct) {
      const newSlots = [...slots];
      newSlots[slotIdx] = selected;
      setSlots(newSlots);

      const newParts = parts.map(p =>
        p.id === selected ? { ...p, placed: true } : p
      );
      setParts(newParts);
      setFeedback({ slot: slotIdx, correct: true });
      setSelected(null);

      if (newParts.every(p => p.placed)) {
        setTimeout(() => {
          setCompleted(true);
          onComplete();
        }, 600);
      }
    } else {
      setFeedback({ slot: slotIdx, correct: false });
      setMistakes(m => m + 1);
    }
  };

  const reset = () => {
    setParts(INITIAL_PARTS);
    setSlots(Array(8).fill(null));
    setSelected(null);
    setFeedback(null);
    setCompleted(false);
    setMistakes(0);
  };

  const placedCount = parts.filter(p => p.placed).length;
  const selectedPart = parts.find(p => p.id === selected);

  if (completed) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="card-dark text-center py-10">
        <div className="text-6xl mb-4">🔧</div>
        <h2 className="text-3xl font-black text-garage-yellow mb-3">Engine Assembled!</h2>
        <p className="text-xl text-gray-300 mb-4">
          You built an engine with only <span className="text-garage-red font-black">{mistakes}</span> mistakes!
        </p>
        <div className="text-3xl mb-2">
          {mistakes === 0 ? '🌟 Perfect!' : mistakes <= 3 ? '⭐ Great work!' : '👍 Well done!'}
        </div>
        <div className="bg-garage-grey rounded-2xl p-4 inline-block mb-6">
          <div className="text-garage-yellow font-bold">XP Earned</div>
          <div className="text-3xl font-black">+100</div>
        </div>
        <button onClick={reset} className="btn-ghost block mx-auto">🔄 Try Again</button>
      </motion.div>
    );
  }

  return (
    <div className="card-dark">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-black text-garage-yellow">🔧 Engine Assembly Workshop</h3>
        <span className="text-sm font-bold text-gray-400">{placedCount}/{parts.length} placed</span>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Select a part, then click where it belongs! Follow the hints.
      </p>

      {/* Progress */}
      <div className="h-2 bg-garage-lightgrey rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-garage-yellow to-garage-orange rounded-full"
          animate={{ width: `${(placedCount / parts.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Selected part info */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-garage-yellow/10 border border-garage-yellow rounded-2xl p-3 mb-4"
          >
            <span className="text-2xl mr-2">{selectedPart.emoji}</span>
            <span className="font-black text-garage-yellow">{selectedPart.name}</span>
            <span className="text-gray-300 text-sm ml-2">— {selectedPart.description}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Parts bin */}
        <div className="bg-garage-dark rounded-2xl p-4 border border-garage-grey">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Parts Bin</p>
          <div className="grid grid-cols-2 gap-2">
            {parts.filter(p => !p.placed).map(part => (
              <motion.button
                key={part.id}
                onClick={() => handlePartClick(part.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  selected === part.id
                    ? 'border-garage-yellow bg-garage-yellow/20 text-white'
                    : 'border-garage-lightgrey text-gray-300 hover:border-white'
                }`}
              >
                <div className="text-2xl">{part.emoji}</div>
                <div className="text-xs font-bold mt-1 leading-tight">{part.name}</div>
              </motion.button>
            ))}
            {parts.filter(p => !p.placed).length === 0 && (
              <p className="text-gray-500 text-sm col-span-2 text-center py-4">All parts placed! 🎉</p>
            )}
          </div>
        </div>

        {/* Engine slots */}
        <div className="bg-garage-dark rounded-2xl p-4 border border-garage-grey">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Engine</p>
          <div className="grid grid-cols-2 gap-2">
            {SLOTS.map((slot, i) => {
              const placedPart = parts.find(p => p.id === slots[i]);
              const isTarget = feedback?.slot === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => handleSlotClick(i)}
                  disabled={slots[i] !== null}
                  animate={isTarget ? {
                    backgroundColor: feedback?.correct ? '#276749' : '#742A2A',
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    placedPart
                      ? 'border-green-500 bg-green-900/40 text-white'
                      : selected
                        ? 'border-garage-yellow border-dashed text-garage-yellow hover:bg-garage-yellow/10 cursor-pointer animate-pulse'
                        : 'border-garage-lightgrey text-gray-500 cursor-default'
                  }`}
                >
                  {placedPart ? (
                    <>
                      <div className="text-2xl">{placedPart.emoji}</div>
                      <div className="text-xs font-bold mt-1 text-green-300">{placedPart.name}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-xl text-gray-600">?</div>
                      <div className="text-xs font-bold mt-1">{slot.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{slot.hint}</div>
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Mistakes: <span className="text-garage-red font-bold">{mistakes}</span>
        </span>
        <button onClick={reset} className="btn-ghost text-sm py-2 px-4">🔄 Reset</button>
      </div>
    </div>
  );
}
