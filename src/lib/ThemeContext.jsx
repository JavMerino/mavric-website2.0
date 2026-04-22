import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

const THEMES = {
  morning: {
    name: 'Mañana',
    isLight: true,
    accent1: '#2563EB',
    accent2: '#0891B2',
    btnBg: 'linear-gradient(135deg, #2563EB, #0891B2)',
    btnText: '#FFFFFF',
    glow: 'rgba(37, 99, 235, 0.18)',
    gradientStart: '#E8F0FE',
    gradientMid: '#D4E4FC',
    gradientEnd: '#C7DAFA',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)',
    particleColor: 'rgba(37, 99, 235, 0.15)',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    cardBg: 'rgba(255, 255, 255, 0.6)',
    cardBorder: 'rgba(15, 23, 42, 0.08)',
    navBg: 'rgba(232, 240, 254, 0.85)',
    navBorder: 'rgba(15, 23, 42, 0.06)',
    panelBg: 'rgba(255, 255, 255, 0.85)',
    panelBorder: 'rgba(15, 23, 42, 0.1)',
    gridLine: 'rgba(15, 23, 42, 0.04)',
    orbOpacity: 0.12,
    showStars: false,
    rainColor: 'rgba(30, 58, 138, 0.4)',
    rainHighlight: 'rgba(59, 130, 246, 0.25)',
    footerBorder: 'rgba(15, 23, 42, 0.08)',
  },
  midday: {
    name: 'Mediodía',
    isLight: true,
    accent1: '#0284C7',
    accent2: '#0EA5E9',
    btnBg: 'linear-gradient(135deg, #0284C7, #0EA5E9)',
    btnText: '#FFFFFF',
    glow: 'rgba(2, 132, 199, 0.2)',
    gradientStart: '#F0F9FF',
    gradientMid: '#E0F2FE',
    gradientEnd: '#D0EAFB',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(14, 165, 233, 0.15)',
    textPrimary: '#0C1427',
    textSecondary: '#1E3A5F',
    textMuted: '#4B6A8F',
    cardBg: 'rgba(255, 255, 255, 0.65)',
    cardBorder: 'rgba(15, 23, 42, 0.07)',
    navBg: 'rgba(240, 249, 255, 0.88)',
    navBorder: 'rgba(15, 23, 42, 0.06)',
    panelBg: 'rgba(255, 255, 255, 0.88)',
    panelBorder: 'rgba(15, 23, 42, 0.1)',
    gridLine: 'rgba(15, 23, 42, 0.03)',
    orbOpacity: 0.1,
    showStars: false,
    rainColor: 'rgba(7, 89, 133, 0.35)',
    rainHighlight: 'rgba(56, 189, 248, 0.2)',
    footerBorder: 'rgba(15, 23, 42, 0.07)',
  },
  afternoon: {
    name: 'Tarde',
    isLight: true,
    accent1: '#3B82F6',
    accent2: '#8B5CF6',
    btnBg: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    btnText: '#FFFFFF',
    glow: 'rgba(59, 130, 246, 0.18)',
    gradientStart: '#EDE9FE',
    gradientMid: '#DDD6FE',
    gradientEnd: '#D4C8F8',
    aura: 'radial-gradient(ellipse at 50% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)',
    particleColor: 'rgba(139, 92, 246, 0.15)',
    textPrimary: '#1E1B4B',
    textSecondary: '#3730A3',
    textMuted: '#6366A0',
    cardBg: 'rgba(255, 255, 255, 0.55)',
    cardBorder: 'rgba(30, 27, 75, 0.08)',
    navBg: 'rgba(237, 233, 254, 0.85)',
    navBorder: 'rgba(30, 27, 75, 0.06)',
    panelBg: 'rgba(255, 255, 255, 0.85)',
    panelBorder: 'rgba(30, 27, 75, 0.1)',
    gridLine: 'rgba(30, 27, 75, 0.03)',
    orbOpacity: 0.12,
    showStars: false,
    rainColor: 'rgba(67, 56, 202, 0.35)',
    rainHighlight: 'rgba(139, 92, 246, 0.2)',
    footerBorder: 'rgba(30, 27, 75, 0.08)',
  },
  sunset: {
    name: 'Atardecer',
    isLight: false,
    accent1: '#F97316',
    accent2: '#A855F7',
    btnBg: 'linear-gradient(135deg, #F97316, #A855F7)',
    btnText: '#FFFFFF',
    glow: 'rgba(249, 115, 22, 0.2)',
    gradientStart: '#1C0A2E',
    gradientMid: '#2D1045',
    gradientEnd: '#3A1255',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.15) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)',
    particleColor: 'rgba(249, 115, 22, 0.25)',
    textPrimary: '#FDF4FF',
    textSecondary: '#E9D5FF',
    textMuted: '#C4B5D3',
    cardBg: 'rgba(44, 16, 69, 0.6)',
    cardBorder: 'rgba(248, 250, 252, 0.08)',
    navBg: 'rgba(28, 10, 46, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(28, 10, 46, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.2,
    showStars: true,
    starCount: 30,
    rainColor: 'rgba(196, 181, 253, 0.35)',
    rainHighlight: 'rgba(249, 115, 22, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  dusk: {
    name: 'Anochecer',
    isLight: false,
    accent1: '#818CF8',
    accent2: '#6D28D9',
    btnBg: 'linear-gradient(135deg, #818CF8, #6D28D9)',
    btnText: '#FFFFFF',
    glow: 'rgba(129, 140, 248, 0.18)',
    gradientStart: '#0B0E1F',
    gradientMid: '#111738',
    gradientEnd: '#161D45',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(129,140,248,0.12) 0%, transparent 60%)',
    particleColor: 'rgba(129, 140, 248, 0.3)',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    cardBg: 'rgba(17, 23, 56, 0.6)',
    cardBorder: 'rgba(248, 250, 252, 0.06)',
    navBg: 'rgba(11, 14, 31, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(11, 14, 31, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.18,
    showStars: true,
    starCount: 50,
    rainColor: 'rgba(148, 163, 184, 0.35)',
    rainHighlight: 'rgba(129, 140, 248, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  night: {
    name: 'Noche',
    isLight: false,
    accent1: '#6D5EF9',
    accent2: '#7C3AED',
    btnBg: 'linear-gradient(135deg, #6D5EF9, #7C3AED)',
    btnText: '#FFFFFF',
    glow: 'rgba(109, 94, 249, 0.2)',
    gradientStart: '#050810',
    gradientMid: '#080D1A',
    gradientEnd: '#0A1025',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(109,94,249,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(109, 94, 249, 0.35)',
    textPrimary: '#F8FAFC',
    textSecondary: '#DCE7FF',
    textMuted: '#94A3B8',
    cardBg: 'rgba(16, 24, 43, 0.6)',
    cardBorder: 'rgba(248, 250, 252, 0.05)',
    navBg: 'rgba(5, 8, 16, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(5, 8, 16, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.2,
    showStars: true,
    starCount: 80,
    rainColor: 'rgba(148, 194, 255, 0.4)',
    rainHighlight: 'rgba(109, 94, 249, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.05)',
  },
};

// Cloudy overlays per theme
const CLOUDY_OVERRIDES = {
  morning: { gradientStart: '#D1D5DB', gradientMid: '#C8CDD5', gradientEnd: '#BFC5CF', accent1: '#4B5563', accent2: '#6B7280', glow: 'rgba(75, 85, 99, 0.12)', textPrimary: '#1F2937', textSecondary: '#374151', textMuted: '#6B7280', cardBg: 'rgba(255,255,255,0.5)', orbOpacity: 0.06 },
  midday: { gradientStart: '#E5E7EB', gradientMid: '#D1D5DB', gradientEnd: '#C8CDD5', accent1: '#4B5563', accent2: '#6B7280', glow: 'rgba(75, 85, 99, 0.12)', textPrimary: '#111827', textSecondary: '#374151', textMuted: '#6B7280', cardBg: 'rgba(255,255,255,0.5)', orbOpacity: 0.06 },
  afternoon: { gradientStart: '#D6D3E0', gradientMid: '#C8C4D6', gradientEnd: '#BCB8CC', accent1: '#6366A0', accent2: '#7C3AED', glow: 'rgba(99, 102, 160, 0.12)', textPrimary: '#1E1B4B', textSecondary: '#3730A3', textMuted: '#6366A0', cardBg: 'rgba(255,255,255,0.45)', orbOpacity: 0.08 },
  sunset: { gradientStart: '#1A0E22', gradientMid: '#221430', gradientEnd: '#2A1838', accent1: '#C2884A', accent2: '#8B5CF6', glow: 'rgba(194, 136, 74, 0.12)', orbOpacity: 0.1 },
  dusk: { gradientStart: '#0D0F1C', gradientMid: '#121530', gradientEnd: '#161940', accent1: '#6B7280', accent2: '#4B5563', glow: 'rgba(107, 114, 128, 0.1)', orbOpacity: 0.08 },
  night: { gradientStart: '#060810', gradientMid: '#0A0D18', gradientEnd: '#0D1020', accent1: '#6B7280', accent2: '#4B5563', glow: 'rgba(107, 114, 128, 0.1)', orbOpacity: 0.08 },
};

function hourToTheme(hour) {
  if (hour >= 6 && hour < 10) return 'morning';
  if (hour >= 10 && hour < 14) return 'midday';
  if (hour >= 14 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 19) return 'sunset';
  if (hour >= 19 && hour < 21) return 'dusk';
  return 'night';
}

export function ThemeProvider({ children }) {
  const [autoTime, setAutoTime] = useState(true);
  const [manualHour, setManualHour] = useState(new Date().getHours());
  const [rainMode, setRainMode] = useState(false);
  const [cloudyMode, setCloudyMode] = useState(false);
  const [weatherMode, setWeatherMode] = useState('clear'); // 'clear' | 'cloudy' | 'rain'

  const currentHour = autoTime ? new Date().getHours() : manualHour;
  const currentThemeName = hourToTheme(currentHour);

  const theme = useMemo(() => {
    let base = { ...THEMES[currentThemeName] };
    if (weatherMode === 'cloudy' || weatherMode === 'rain') {
      const overrides = CLOUDY_OVERRIDES[currentThemeName];
      if (overrides) base = { ...base, ...overrides };
    }
    return base;
  }, [currentThemeName, weatherMode]);

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

  const isRaining = weatherMode === 'rain';
  const isCloudy = weatherMode === 'cloudy' || weatherMode === 'rain';

  return (
    <ThemeContext.Provider value={{
      theme, currentThemeName, currentHour, autoTime,
      rainMode: isRaining, cloudyMode: isCloudy, weatherMode,
      setHour, enableAutoTime, setWeatherMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}