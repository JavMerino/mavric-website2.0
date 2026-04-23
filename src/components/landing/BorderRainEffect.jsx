import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Subtle rain-on-border ripple effect.
 * Place inside a position:relative container.
 * @param {string} edge - 'top' | 'bottom' | 'all'
 * @param {number} count - number of ripple points
 */
export default function BorderRainEffect({ edge = 'top', count = 7 }) {
  const ripples = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: 4 + Math.random() * 92,
      delay: Math.random() * 3.5,
      duration: 2 + Math.random() * 1.5,
      size: 2.5 + Math.random() * 3,
    })), [count]
  );

  const showTop = edge === 'top' || edge === 'all';
  const showBottom = edge === 'bottom' || edge === 'all';

  const renderRipples = (vertical) =>
    ripples.map(r => (
      <motion.div
        key={`${vertical}-${r.id}`}
        className="absolute rounded-full"
        style={{
          left: `${r.pos}%`,
          [vertical]: -1,
          width: r.size,
          height: r.size * 0.45,
          background: 'rgba(148, 194, 255, 0.4)',
          boxShadow: '0 0 5px rgba(148, 194, 255, 0.2)',
        }}
        animate={{
          scale: [0, 2, 3.5],
          opacity: [0.55, 0.25, 0],
        }}
        transition={{
          duration: r.duration,
          delay: r.delay,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ));

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none">
      {showTop && renderRipples('top')}
      {showBottom && renderRipples('bottom')}
    </div>
  );
}