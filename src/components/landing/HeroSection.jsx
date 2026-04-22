import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowRight, ChevronRight } from 'lucide-react';

function HeroVisual() {
  const { theme } = useTheme();
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Floating dashboard mockup */}
      <motion.div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          background: 'rgba(16, 24, 43, 0.8)',
          borderColor: 'rgba(248, 250, 252, 0.06)',
          boxShadow: `0 0 80px ${theme.glow}, 0 20px 60px rgba(0,0,0,0.5)`,
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Fake window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(248,250,252,0.05)' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <div className="ml-4 h-5 w-40 rounded bg-white/5" />
        </div>
        {/* Content mockup */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[theme.accent1, theme.accent2, '#22D3EE'].map((c, i) => (
              <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(248,250,252,0.03)' }}>
                <div className="w-6 h-6 rounded mb-2" style={{ background: c, opacity: 0.7 }} />
                <div className="h-2 w-full rounded bg-white/10" />
                <div className="h-2 w-2/3 rounded bg-white/5 mt-1.5" />
                <div className="text-lg font-heading font-bold mt-2" style={{ color: c }}>
                  {['98%', '2.4x', '340+'][i]}
                </div>
              </div>
            ))}
          </div>
          <div className="h-20 rounded-lg" style={{
            background: `linear-gradient(90deg, ${theme.accent1}15, ${theme.accent2}15)`,
          }}>
            <div className="flex items-end h-full px-3 pb-2 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${20 + Math.random() * 70}%`,
                    background: `linear-gradient(to top, ${theme.accent1}40, ${theme.accent2}20)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Small floating card */}
      <motion.div
        className="absolute -bottom-4 -left-6 md:-left-12 rounded-xl px-4 py-3 border"
        style={{
          background: 'rgba(16, 24, 43, 0.9)',
          borderColor: 'rgba(248, 250, 252, 0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 0 40px ${theme.glow}`,
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${theme.accent1}20` }}>
            <ChevronRight size={14} style={{ color: theme.accent1 }} />
          </div>
          <div>
            <div className="text-xs text-mavric-text-muted font-mono">deploy.status</div>
            <div className="text-sm font-heading font-semibold text-green-400">Live — 99.9% uptime</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
              style={{
                borderColor: `${theme.accent1}30`,
                background: `${theme.accent1}08`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent1 }} />
              <span className="text-xs font-mono tracking-wider" style={{ color: theme.accent1 }}>
                Custom Software · Automation · Cloud · AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-mavric-text mb-6"
            >
              We Engineer the{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                }}
              >
                Software
              </span>{' '}
              That Powers Your Next Move
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-mavric-text-muted leading-relaxed max-w-lg mb-10"
            >
              From custom platforms to AI-driven automation, we design and build
              precision-grade digital systems that scale with your ambition.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-mavric-text transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                  boxShadow: `0 0 30px ${theme.glow}`,
                }}
              >
                Book a Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-mavric-text-dim border transition-all duration-300 hover:bg-white/5"
                style={{ borderColor: 'rgba(248,250,252,0.1)' }}
              >
                View Work
              </a>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex gap-8 flex-wrap"
            >
              {[
                { val: '50+', label: 'Projects Shipped' },
                { val: '99.9%', label: 'Uptime SLA' },
                { val: '3x', label: 'Faster Delivery' },
              ].map((m, i) => (
                <div key={i}>
                  <div className="text-2xl font-heading font-bold" style={{ color: theme.accent1 }}>
                    {m.val}
                  </div>
                  <div className="text-xs text-mavric-text-muted font-mono tracking-wide">{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}