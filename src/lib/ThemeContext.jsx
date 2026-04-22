import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

const THEMES = {
  morning: {
    name: 'Morning',
    accent1: '#4F7CFF',
    accent2: '#22D3EE',
    glow: 'rgba(79, 124, 255, 0.15)',
    gradientStart: '#070B14',
    gradientMid: '#0B1832',
    gradientEnd: '#122244',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(79,124,255,0.12) 0%, transparent 60%)',
    particleColor: 'rgba(34, 211, 238, 0.3)',
  },
  midday: {
    name: 'Midday',
    accent1: '#00C2FF',
    accent2: '#4F7CFF',
    glow: 'rgba(0, 194, 255, 0.18)',
    gradientStart: '#070B14',
    gradientMid: '#0D1A30',
    gradientEnd: '#0F2040',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(0,194,255,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(0, 194, 255, 0.4)',
  },
  sunset: {
    name: 'Sunset',
    accent1: '#FF7A18',
    accent2: '#7A3BFF',
    glow: 'rgba(255, 122, 24, 0.15)',
    gradientStart: '#070B14',
    gradientMid: '#1A0D20',
    gradientEnd: '#2A1030',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(255,122,24,0.12) 0%, rgba(122,59,255,0.08) 40%, transparent 70%)',
    particleColor: 'rgba(255, 122, 24, 0.3)',
  },
  night: {
    name: 'Night',
    accent1: '#6D5EF9',
    accent2: '#7A3BFF',
    glow: 'rgba(109, 94, 249, 0.15)',
    gradientStart: '#050810',
    gradientMid: '#080D1A',
    gradientEnd: '#0A1025',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(109,94,249,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(109, 94, 249, 0.3)',
  },
};

function getTimeTheme(hour) {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'midday';
  if (hour >= 17 && hour < 21) return 'sunset';
  return 'night';
}

function hourToTheme(hour) {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'midday';
  if (hour >= 17 && hour < 21) return 'sunset';
  return 'night';
}

export function ThemeProvider({ children }) {
  const [autoTime, setAutoTime] = useState(true);
  const [manualHour, setManualHour] = useState(new Date().getHours());
  const [rainMode, setRainMode] = useState(false);

  const currentHour = autoTime ? new Date().getHours() : manualHour;
  const currentThemeName = hourToTheme(currentHour);
  const theme = THEMES[currentThemeName];

  useEffect(() => {
    if (!autoTime) return;
    const interval = setInterval(() => {
      setManualHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, [autoTime]);

  const setHour = useCallback((h) => {
    setAutoTime(false);
    setManualHour(h);
  }, []);

  const enableAutoTime = useCallback(() => {
    setAutoTime(true);
    setManualHour(new Date().getHours());
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme, currentThemeName, currentHour, autoTime, rainMode,
      setHour, enableAutoTime, setRainMode, setAutoTime,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}