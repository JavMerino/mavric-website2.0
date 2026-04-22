import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function RainOverlay() {
  const { rainMode, theme } = useTheme();
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const dropsRef = useRef([]);

  useEffect(() => {
    if (!rainMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);

    dropsRef.current = Array.from({ length: 160 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: Math.random() * 22 + 8,
      speed: Math.random() * 7 + 4,
      opacity: Math.random() * 0.35 + 0.15,
      width: Math.random() * 1.2 + 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      dropsRef.current.forEach(drop => {
        // Main drop line
        ctx.beginPath();
        ctx.strokeStyle = theme.rainColor;
        ctx.lineWidth = drop.width;
        ctx.globalAlpha = drop.opacity;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 0.5, drop.y + drop.len);
        ctx.stroke();

        // Subtle highlight streak
        ctx.beginPath();
        ctx.strokeStyle = theme.rainHighlight || 'rgba(255,255,255,0.08)';
        ctx.lineWidth = drop.width * 0.5;
        ctx.globalAlpha = drop.opacity * 0.4;
        ctx.moveTo(drop.x + 0.8, drop.y + 2);
        ctx.lineTo(drop.x + 1, drop.y + drop.len * 0.6);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > h) {
          drop.y = -drop.len;
          drop.x = Math.random() * w;
        }
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [rainMode, theme.rainColor, theme.rainHighlight]);

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