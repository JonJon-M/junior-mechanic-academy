import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

export default function Tooltip({ term, definition, children }: Props) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        className="underline decoration-dotted decoration-garage-yellow text-garage-yellow cursor-help font-bold"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={() => setShow(s => !s)}
      >
        {children || term}
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-garage-dark
                       border border-garage-yellow text-white text-sm p-3 rounded-xl shadow-2xl z-50
                       pointer-events-none"
          >
            <div className="font-bold text-garage-yellow mb-1">{term}</div>
            <div className="text-gray-300 leading-snug">{definition}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                           border-l-4 border-r-4 border-t-4 border-transparent border-t-garage-yellow" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
