import React, { useMemo } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

function StarField({ count = 40, color }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70, // top 70% only for sky feel
      size: Math.random() * 1.5 + 0.4,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 3,
      maxOpacity: Math.random() * 0.4 + 0.15,
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
            boxShadow: `0 0 ${s.size * 2}px ${color}`,
          }}
          animate={{ opacity: [0.05, s.maxOpacity, 0.05] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function BackgroundAtmosphere() {
  const { theme, cloudyMode, weatherMode } = useTheme();

  // Stars only in clear weather and only for themes that define them
  const showStars = theme.showStars && weatherMode === 'clear';

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

      {/* Stars - only clear + dusk/night */}
      <AnimatePresence>
        {showStars && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <StarField
              count={theme.starCount || 30}
              color={theme.particleColor}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cloudy overlay */}
      <AnimatePresence>
        {cloudyMode && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: theme.isLight
                ? 'linear-gradient(180deg, rgba(156,163,175,0.35) 0%, rgba(209,213,219,0.25) 40%, rgba(229,231,235,0.15) 100%)'
                : 'linear-gradient(180deg, rgba(30,41,59,0.5) 0%, rgba(51,65,85,0.3) 40%, rgba(30,41,59,0.15) 100%)',
            }}
          />
        )}
      </AnimatePresence>

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