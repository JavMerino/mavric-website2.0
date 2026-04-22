import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Sun, Moon, CloudRain, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const timeLabels = [
  { hour: 8, label: 'Morning' },
  { hour: 14, label: 'Midday' },
  { hour: 19, label: 'Sunset' },
  { hour: 23, label: 'Night' },
];

export default function ThemeControlPanel() {
  const { currentHour, autoTime, rainMode, setHour, enableAutoTime, setRainMode } = useTheme();
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      className="fixed top-20 right-4 z-50"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
    >
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: 'rgba(7, 11, 20, 0.85)',
          borderColor: 'rgba(248, 250, 252, 0.08)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="flex items-center gap-2">
            <Clock size={12} style={{ color: theme.accent1 }} />
            <span className="text-[11px] font-mono text-mavric-text-muted tracking-wider">
              ENVIRONMENT
            </span>
          </div>
          {collapsed ? (
            <ChevronDown size={12} className="text-mavric-text-muted" />
          ) : (
            <ChevronUp size={12} className="text-mavric-text-muted" />
          )}
        </button>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                {/* Time slider */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-mavric-text-muted mb-2">
                    <span>00:00</span>
                    <span className="font-medium" style={{ color: theme.accent1 }}>
                      {String(currentHour).padStart(2, '0')}:00
                    </span>
                    <span>23:00</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={23}
                    step={1}
                    value={currentHour}
                    onChange={(e) => setHour(parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(90deg, #22D3EE, #4F7CFF, #FF7A18, #6D5EF9, #22D3EE)`,
                    }}
                  />
                </div>

                {/* Quick time buttons */}
                <div className="grid grid-cols-4 gap-1.5">
                  {timeLabels.map(t => (
                    <button
                      key={t.hour}
                      onClick={() => setHour(t.hour)}
                      className="text-[9px] font-mono tracking-wider py-1.5 rounded-lg border transition-all hover:bg-white/5"
                      style={{
                        borderColor: currentHour === t.hour ? `${theme.accent1}40` : 'rgba(248,250,252,0.06)',
                        color: currentHour === t.hour ? theme.accent1 : '#94A3B8',
                        background: currentHour === t.hour ? `${theme.accent1}08` : 'transparent',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={enableAutoTime}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[10px] font-mono tracking-wider transition-all hover:bg-white/5"
                    style={{
                      borderColor: autoTime ? `${theme.accent1}40` : 'rgba(248,250,252,0.06)',
                      color: autoTime ? theme.accent1 : '#94A3B8',
                      background: autoTime ? `${theme.accent1}08` : 'transparent',
                    }}
                  >
                    <Sun size={10} /> Auto
                  </button>
                  <button
                    onClick={() => setRainMode(!rainMode)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[10px] font-mono tracking-wider transition-all hover:bg-white/5"
                    style={{
                      borderColor: rainMode ? '#22D3EE40' : 'rgba(248,250,252,0.06)',
                      color: rainMode ? '#22D3EE' : '#94A3B8',
                      background: rainMode ? '#22D3EE08' : 'transparent',
                    }}
                  >
                    <CloudRain size={10} /> Rain
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}