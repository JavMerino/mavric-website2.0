import React, { useMemo } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion } from 'framer-motion';

function StarField({ count = 60, color }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    })), [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: color,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export default function BackgroundAtmosphere() {
  const { theme, cloudyMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000" style={{ background: theme.gradientStart }}>
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(180deg, ${theme.gradientStart} 0%, ${theme.gradientMid} 50%, ${theme.gradientEnd} 100%)`,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Aura glow */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: theme.aura }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Orb 1 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        animate={{
          background: theme.accent1,
          opacity: theme.orbOpacity,
          x: [0, 50, -30, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '20%' }}
      />

      {/* Orb 2 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        animate={{
          background: theme.accent2,
          opacity: theme.orbOpacity * 0.75,
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '40%', right: '10%' }}
      />

      {/* Stars */}
      {theme.showStars && !cloudyMode && (
        <StarField
          count={theme.starCount || 60}
          color={theme.particleColor}
        />
      )}

      {/* Cloudy overlay */}
      {cloudyMode && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            background: theme.isLight
              ? 'linear-gradient(180deg, rgba(156,163,175,0.3) 0%, rgba(209,213,219,0.2) 50%, transparent 100%)'
              : 'linear-gradient(180deg, rgba(30,41,59,0.4) 0%, rgba(51,65,85,0.2) 50%, transparent 100%)',
          }}
        />
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.5,
          backgroundImage: `
            linear-gradient(${theme.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}