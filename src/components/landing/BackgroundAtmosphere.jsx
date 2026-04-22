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
  const { theme, currentThemeName } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: theme.gradientStart }}>
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(180deg, ${theme.gradientStart} 0%, ${theme.gradientMid} 50%, ${theme.gradientEnd} 100%)`,
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Aura glow */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: theme.aura }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Orb 1 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        animate={{
          background: theme.accent1,
          x: [0, 50, -30, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '20%' }}
      />

      {/* Orb 2 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
        animate={{
          background: theme.accent2,
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '40%', right: '10%' }}
      />

      {/* Stars for night */}
      {(currentThemeName === 'night' || currentThemeName === 'sunset') && (
        <StarField
          count={currentThemeName === 'night' ? 80 : 30}
          color={theme.particleColor}
        />
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(248,250,252,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,250,252,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}