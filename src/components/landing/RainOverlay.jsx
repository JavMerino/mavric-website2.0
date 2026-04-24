import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function RainOverlay() {
  const { rainMode, theme, currentThemeName } = useTheme();
  const isNightOrDusk = currentThemeName === 'night' || currentThemeName === 'dusk';
  const shouldShowLightning = rainMode && isNightOrDusk;
  const canvasRef = useRef(/** @type {HTMLCanvasElement | null} */ (null));
  const animRef = useRef(/** @type {number | null} */ (null));
  const lightningTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const rainColorRef = useRef(theme.rainColor);
  const rainHighlightRef = useRef(theme.rainHighlight);
  const dropsRef = useRef(/** @type {{ x: number; y: number; len: number; speed: number; opacity: number; width: number; }[]} */ ([]));

  useEffect(() => {
    rainColorRef.current = theme.rainColor;
    rainHighlightRef.current = theme.rainHighlight;
  }, [theme.rainColor, theme.rainHighlight]);

  useEffect(() => {
    if (!rainMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const cpuCores = navigator.hardwareConcurrency || 4;
    const lowPowerDevice = cpuCores <= 4 || w < 768;
    const targetFps = lowPowerDevice ? 30 : 45;
    const qualityScale = lowPowerDevice ? 0.72 : 0.85;
    const visibilityBoost = theme.isLight ? 1.28 : 1.12;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    const setupCanvas = () => {
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * pixelRatio * qualityScale);
      canvas.height = Math.floor(h * pixelRatio * qualityScale);
      const renderScale = (canvas.width / w) || 1;
      ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
    };

    setupCanvas();

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      setupCanvas();
    };
    window.addEventListener('resize', resize, { passive: true });

    const windAngle = 0.42;
    const densityBoost = lowPowerDevice ? 1.32 : 1.38;
    const dropSizeBoost = 1.1;

    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    const createBoltPath = () => {
      const points = [];
      let x = randomBetween(w * 0.12, w * 0.88);
      let y = -20;
      const segmentCount = Math.floor(randomBetween(8, 13));
      const step = h / (segmentCount + 2);

      for (let i = 0; i < segmentCount; i++) {
        x += randomBetween(-24, 24);
        y += step * randomBetween(0.8, 1.2);
        points.push({ x, y });
        if (y >= h * 0.75) break;
      }

      return points;
    };

    const viewportArea = w * h;
    const densityFactor = lowPowerDevice ? 28000 : 22000;
    const baseDropCount = Math.floor(viewportArea / densityFactor);
    const dropCount = Math.max(44, Math.min(lowPowerDevice ? 92 : 120, Math.floor(baseDropCount * densityBoost)));
    dropsRef.current = Array.from({ length: dropCount }, () => ({
      x: Math.random() * (w + 200) - 100,
      y: Math.random() * h,
      len: (Math.random() * 24 + 16) * dropSizeBoost,
      speed: Math.random() * 4.4 + 3.4,
      opacity: Math.min(0.88, (Math.random() * 0.22 + 0.2) * visibilityBoost * 1.08),
      width: (Math.random() * 2.2 + 1.4) * dropSizeBoost,
    }));

    const dx = Math.sin(windAngle);
    const dy = Math.cos(windAngle);

    const targetFrameMs = 1000 / targetFps;
    let lastFrameTs = 0;
    let adaptiveLoad = 1;
    let activeBolt = [];
    let lightningPulseUntil = 0;
    let lightningFadeUntil = 0;
    let secondaryStrikeAt = 0;
    let lightningIntensity = 0;

    const clearLightningTimer = () => {
      if (lightningTimerRef.current) {
        clearTimeout(lightningTimerRef.current);
        lightningTimerRef.current = null;
      }
    };

    const triggerLightning = (ts, isSecondary = false) => {
      activeBolt = createBoltPath();
      lightningIntensity = randomBetween(0.8, 1.15);
      lightningPulseUntil = ts + randomBetween(90, 150);
      lightningFadeUntil = lightningPulseUntil + randomBetween(170, 260);

      if (!isSecondary && Math.random() < 0.32) {
        secondaryStrikeAt = ts + randomBetween(130, 260);
      } else {
        secondaryStrikeAt = 0;
      }

    };

    const scheduleNextLightning = () => {
      if (!shouldShowLightning) {
        clearLightningTimer();
        return;
      }

      clearLightningTimer();
      const delay = randomBetween(1400, 7000);
      lightningTimerRef.current = setTimeout(() => {
        triggerLightning(performance.now());
        scheduleNextLightning();
      }, delay);
    };

    scheduleNextLightning();

    const adaptLoad = (/** @type {number} */ frameMs) => {
      if (frameMs > targetFrameMs * 1.35) {
        adaptiveLoad = Math.max(0.55, adaptiveLoad - 0.05);
      } else if (frameMs < targetFrameMs * 0.95) {
        adaptiveLoad = Math.min(1, adaptiveLoad + 0.02);
      }
    };

    const draw = (ts = 0) => {
      if (document.visibilityState !== 'visible') {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      if (ts - lastFrameTs < targetFrameMs) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      const frameMs = ts - lastFrameTs;
      lastFrameTs = ts;
      adaptLoad(frameMs);

      ctx.clearRect(0, 0, w, h);
      const drops = dropsRef.current;
      const drawStride = adaptiveLoad < 0.7 ? 2 : 1;

      ctx.fillStyle = rainColorRef.current;
      ctx.strokeStyle = rainHighlightRef.current || 'rgba(200,220,255,0.3)';
      ctx.lineWidth = lowPowerDevice ? 0.95 : 1.15;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        if (i % drawStride !== 0) continue;
        const drop = drops[i];
        // Tail goes opposite to movement so the droplet head leads.
        const tailX = drop.x - dx * drop.len;
        const tailY = drop.y - dy * drop.len;

        // Tapered teardrop body
        const perpX = dy * drop.width * 0.5;
        const perpY = -dx * drop.width * 0.5;

        ctx.globalAlpha = Math.min(0.9, drop.opacity * 1.15);
        ctx.beginPath();
        ctx.moveTo(drop.x - perpX, drop.y - perpY);
        ctx.lineTo(drop.x + perpX, drop.y + perpY);
        ctx.lineTo(tailX, tailY);
        ctx.closePath();
        ctx.fill();

        if ((!lowPowerDevice || i % 2 === 0) && adaptiveLoad >= 0.65) {
          ctx.globalAlpha = Math.min(0.75, drop.opacity * 0.65);
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }

        drop.y += drop.speed * dy;
        drop.x += drop.speed * dx;
        if (drop.y > h || drop.x > w + 100) {
          drop.y = -(Math.random() * 50);
          drop.x = Math.random() * (w + 200) - 200;
        }
      }

      if (shouldShowLightning && secondaryStrikeAt && ts >= secondaryStrikeAt) {
        triggerLightning(ts, true);
      }

      if (shouldShowLightning && ts <= lightningFadeUntil) {
        const pulsePhase = ts <= lightningPulseUntil
          ? 1
          : Math.max(0, 1 - (ts - lightningPulseUntil) / Math.max(1, lightningFadeUntil - lightningPulseUntil));
        const flashAlpha = Math.min(0.5, 0.34 * lightningIntensity * pulsePhase);

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = flashAlpha;
        ctx.fillStyle = 'rgba(228, 238, 255, 1)';
        ctx.fillRect(0, 0, w, h);

        if (activeBolt.length > 0 && pulsePhase > 0.2) {
          ctx.beginPath();
          ctx.moveTo(activeBolt[0].x, activeBolt[0].y);
          for (let i = 1; i < activeBolt.length; i++) {
            ctx.lineTo(activeBolt[i].x, activeBolt[i].y);
          }
          ctx.strokeStyle = 'rgba(160, 205, 255, 0.8)';
          ctx.globalAlpha = Math.min(0.8, pulsePhase * 0.7 * lightningIntensity);
          ctx.lineWidth = lowPowerDevice ? 2.2 : 2.8;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          ctx.strokeStyle = 'rgba(248, 252, 255, 0.98)';
          ctx.globalAlpha = Math.min(1, pulsePhase * 0.95 * lightningIntensity);
          ctx.lineWidth = lowPowerDevice ? 1.2 : 1.6;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      clearLightningTimer();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [rainMode, shouldShowLightning]);

  return (
    <AnimatePresence>
      {rainMode && (
        <motion.canvas
          ref={canvasRef}
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      )}
    </AnimatePresence>
  );
}
