import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

const PIURA_TZ = 'America/Lima';

// Single palette system — all based on the night palette (#050810 family)
// Lightness varies by time of day: morning lightest → night darkest
const THEMES = {
  morning: {
    name: 'Mañana',
    isLight: false,
    accent1: '#93C5FD',
    accent2: '#67E8F9',
    btnBg: '#3B82F6',
    btnText: '#FFFFFF',
    highlightColor: '#93C5FD',
    glow: 'rgba(59, 130, 246, 0.14)',
    gradientStart: '#1A2340',
    gradientMid: '#1E2A4A',
    gradientEnd: '#223055',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(147, 197, 253, 0.2)',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    cardBg: 'rgba(26, 35, 64, 0.55)',
    cardBorder: 'rgba(248, 250, 252, 0.07)',
    navBg: 'rgba(26, 35, 64, 0.85)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(26, 35, 64, 0.88)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.1,
    showStars: false,
    rainColor: 'rgba(148, 194, 255, 0.35)',
    rainHighlight: 'rgba(59, 130, 246, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  midday: {
    name: 'Mediodía',
    isLight: false,
    accent1: '#93C5FD',
    accent2: '#67E8F9',
    btnBg: '#3B82F6',
    btnText: '#FFFFFF',
    highlightColor: '#93C5FD',
    glow: 'rgba(59, 130, 246, 0.14)',
    gradientStart: '#162038',
    gradientMid: '#1A2642',
    gradientEnd: '#1E2C4C',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.09) 0%, transparent 60%)',
    particleColor: 'rgba(147, 197, 253, 0.18)',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    cardBg: 'rgba(22, 32, 56, 0.55)',
    cardBorder: 'rgba(248, 250, 252, 0.06)',
    navBg: 'rgba(22, 32, 56, 0.85)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(22, 32, 56, 0.88)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.12,
    showStars: false,
    rainColor: 'rgba(148, 194, 255, 0.35)',
    rainHighlight: 'rgba(59, 130, 246, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  afternoon: {
    name: 'Tarde',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#22D3EE',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(37, 99, 235, 0.16)',
    gradientStart: '#111A30',
    gradientMid: '#15203A',
    gradientEnd: '#192644',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(147, 197, 253, 0.15)',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    cardBg: 'rgba(17, 26, 48, 0.55)',
    cardBorder: 'rgba(248, 250, 252, 0.06)',
    navBg: 'rgba(17, 26, 48, 0.85)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(17, 26, 48, 0.88)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.14,
    showStars: false,
    rainColor: 'rgba(148, 194, 255, 0.38)',
    rainHighlight: 'rgba(37, 99, 235, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  sunset: {
    name: 'Atardecer',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#22D3EE',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(37, 99, 235, 0.18)',
    gradientStart: '#0D1428',
    gradientMid: '#101A32',
    gradientEnd: '#14203C',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(200, 220, 255, 0.3)',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    cardBg: 'rgba(13, 20, 40, 0.58)',
    cardBorder: 'rgba(248, 250, 252, 0.06)',
    navBg: 'rgba(13, 20, 40, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(13, 20, 40, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.16,
    showStars: false,
    rainColor: 'rgba(148, 194, 255, 0.38)',
    rainHighlight: 'rgba(37, 99, 235, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  dusk: {
    name: 'Anochecer',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#22D3EE',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(37, 99, 235, 0.18)',
    gradientStart: '#090E1C',
    gradientMid: '#0C1326',
    gradientEnd: '#0F1830',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(200, 220, 255, 0.45)',
    textPrimary: '#F8FAFC',
    textSecondary: '#DCE7FF',
    textMuted: '#94A3B8',
    cardBg: 'rgba(9, 14, 28, 0.6)',
    cardBorder: 'rgba(248, 250, 252, 0.05)',
    navBg: 'rgba(9, 14, 28, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(9, 14, 28, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.18,
    showStars: true,
    starCount: 25,
    rainColor: 'rgba(148, 194, 255, 0.4)',
    rainHighlight: 'rgba(37, 99, 235, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.05)',
  },
  night: {
    name: 'Noche',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#22D3EE',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(37, 99, 235, 0.2)',
    gradientStart: '#050810',
    gradientMid: '#080D1A',
    gradientEnd: '#0A1025',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(220, 230, 255, 0.55)',
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
    starCount: 55,
    rainColor: 'rgba(148, 194, 255, 0.4)',
    rainHighlight: 'rgba(37, 99, 235, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.05)',
  },
};

// Cloudy/rain overrides — same palette, just muted/dimmer
const CLOUDY_OVERRIDES = {
  morning:   { gradientStart: '#151C32', gradientMid: '#192238', gradientEnd: '#1C263E', accent1: '#7D9CC0', accent2: '#5BA0B8', glow: 'rgba(59, 130, 246, 0.08)', orbOpacity: 0.06, showStars: false },
  midday:    { gradientStart: '#131A2E', gradientMid: '#162034', gradientEnd: '#19243A', accent1: '#7D9CC0', accent2: '#5BA0B8', glow: 'rgba(59, 130, 246, 0.08)', orbOpacity: 0.06, showStars: false },
  afternoon: { gradientStart: '#101728', gradientMid: '#131C2E', gradientEnd: '#162034', accent1: '#7D9CC0', accent2: '#5BA0B8', glow: 'rgba(37, 99, 235, 0.08)', orbOpacity: 0.06, showStars: false },
  sunset:    { gradientStart: '#0C1222', gradientMid: '#0F1628', gradientEnd: '#121A2E', accent1: '#7D9CC0', accent2: '#5BA0B8', glow: 'rgba(37, 99, 235, 0.08)', orbOpacity: 0.06, showStars: false },
  dusk:      { gradientStart: '#080C18', gradientMid: '#0A1020', gradientEnd: '#0D1328', accent1: '#6B7E9A', accent2: '#4B6580', glow: 'rgba(37, 99, 235, 0.06)', orbOpacity: 0.06, showStars: false },
  night:     { gradientStart: '#04060C', gradientMid: '#060A14', gradientEnd: '#080D1C', accent1: '#6B7E9A', accent2: '#4B6580', glow: 'rgba(37, 99, 235, 0.06)', orbOpacity: 0.06, showStars: false },
};

function hourToTheme(hour) {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 15) return 'midday';
  if (hour >= 15 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 19) return 'sunset';
  if (hour >= 19 && hour < 21) return 'dusk';
  return 'night';
}

function getPiuraTime() {
  const now = new Date();
  const str = now.toLocaleString('en-US', { timeZone: PIURA_TZ, hour: 'numeric', minute: 'numeric', hour12: false });
  const [h, m] = str.split(':').map(Number);
  return { hour: h, minute: m };
}

async function fetchPiuraWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-5.1945&longitude=-80.6328&current=weather_code,temperature_2m&timezone=America/Lima'
    );
    const data = await res.json();
    const code = data?.current?.weather_code;
    const temp = data?.current?.temperature_2m;
    let weather = 'clear';
    if (code !== undefined && code !== null) {
      if (code <= 1) weather = 'clear';
      else if (code <= 3 || (code >= 45 && code <= 48)) weather = 'cloudy';
      else weather = 'rain';
    }
    return { weather, temp: temp !== undefined ? Math.round(temp) : null };
  } catch {
    return { weather: 'clear', temp: null };
  }
}

export function ThemeProvider({ children }) {
  const [autoTime, setAutoTime] = useState(true);
  const [manualHour, setManualHour] = useState(() => getPiuraTime().hour);
  const [weatherMode, setWeatherMode] = useState('clear');
  const [autoWeather, setAutoWeather] = useState(true);
  const [piuraMinute, setPiuraMinute] = useState(() => getPiuraTime().minute);
  const [piuraTemp, setPiuraTemp] = useState(null);

  useEffect(() => {
    fetchPiuraWeather().then(({ weather, temp }) => {
      if (autoWeather) setWeatherMode(weather);
      setPiuraTemp(temp);
    });
  }, []);

  const currentHour = autoTime ? getPiuraTime().hour : manualHour;
  const currentThemeName = hourToTheme(currentHour);

  const theme = useMemo(() => {
    let base = { ...THEMES[currentThemeName] };
    if (weatherMode === 'cloudy' || weatherMode === 'rain') {
      const overrides = CLOUDY_OVERRIDES[currentThemeName];
      if (overrides) base = { ...base, ...overrides };
    }
    return base;
  }, [currentThemeName, weatherMode]);

  // Update time every 30s
  useEffect(() => {
    if (!autoTime) return;
    const interval = setInterval(() => {
      const t = getPiuraTime();
      setManualHour(t.hour);
      setPiuraMinute(t.minute);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoTime]);

  // Re-fetch weather every 10 min
  useEffect(() => {
    if (!autoWeather) return;
    const interval = setInterval(() => {
      fetchPiuraWeather().then(({ weather, temp }) => {
        setWeatherMode(weather);
        setPiuraTemp(temp);
      });
    }, 600000);
    return () => clearInterval(interval);
  }, [autoWeather]);

  const setHour = useCallback((h) => {
    setAutoTime(false);
    setManualHour(h);
  }, []);

  const enableAutoTime = useCallback(() => {
    setAutoTime(true);
    setAutoWeather(true);
    const t = getPiuraTime();
    setManualHour(t.hour);
    setPiuraMinute(t.minute);
    fetchPiuraWeather().then(({ weather, temp }) => {
      setWeatherMode(weather);
      setPiuraTemp(temp);
    });
  }, []);

  const handleSetWeatherMode = useCallback((mode) => {
    setAutoWeather(false);
    setWeatherMode(mode);
  }, []);

  const isRaining = weatherMode === 'rain';
  const isCloudy = weatherMode === 'cloudy' || weatherMode === 'rain';

  return (
    <ThemeContext.Provider value={{
      theme, currentThemeName, currentHour, autoTime, autoWeather,
      rainMode: isRaining, cloudyMode: isCloudy, weatherMode,
      piuraMinute, piuraTemp,
      setHour, enableAutoTime, setWeatherMode: handleSetWeatherMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}