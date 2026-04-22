import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const { theme } = useTheme();

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Ambient glow behind */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${theme.accent1}10, transparent 70%)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-6 block" style={{ color: theme.accent1 }}>
            05 // Let's Build
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-mavric-text mb-6 leading-tight">
            Ready to Architect{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}>
              Your Edge
            </span>
            ?
          </h2>
          <p className="text-lg text-mavric-text-muted mb-10 max-w-lg mx-auto">
            Whether it's a new platform, an automation overhaul, or an AI initiative —
            we'll map the fastest path to measurable impact.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@mavrictechnologies.com"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-mavric-text transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                boxShadow: `0 0 40px ${theme.glow}, 0 0 80px ${theme.glow}`,
              }}
            >
              Book a Consultation
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:hello@mavrictechnologies.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-mavric-text-dim border transition-all duration-300 hover:bg-white/5"
              style={{ borderColor: 'rgba(248,250,252,0.1)' }}
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}