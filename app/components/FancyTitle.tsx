import React from 'react';
import { motion, useCycle } from 'framer-motion';

const words = [
  { y: 'M', rest: 'eeting' },
  { y: 'A', rest: 'nd' },
  { y: 'N', rest: 'otes' },
  { y: 'G', rest: 'enerated' },
  { y: 'O', rest: 'verview' },
];

export default function FancyTitle() {
  const [showRest, cycleShowRest] = useCycle(true, false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      cycleShowRest();
    }, 10000); // Increased delay for slower transitions
    return () => clearInterval(interval);
  }, [cycleShowRest]);

  return (
    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex flex-wrap justify-center gap-1">
      {words.map((w, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="text-yellow-400">{w.y}</span>
          <motion.span
            initial={false}
            animate={showRest ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ width: { duration: 0.8, ease: 'easeInOut' }, opacity: { duration: 0.8, ease: 'easeInOut' } }}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              verticalAlign: 'middle',
            }}
          >
            {w.rest}
          </motion.span>
          {/* Add 'desk' after MANGO when compressed */}
          {i === 4 && !showRest && (
            <span className="text-black font-bold ml-2">Desk</span>
          )}
        </span>
      ))}
    </h1>
  );
}
