import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Target, Layers, Shield, ArrowUpRight, Palette, GitBranch } from 'lucide-react';

const differentiators = [
  { icon: Target, title: 'Strategy-First Approach', desc: 'We map software to your business logic — not the other way around.' },
  { icon: Layers, title: 'Scalable Architecture', desc: 'Systems designed to handle 10x growth without rearchitecting.' },
  { icon: Palette, title: 'Clean UX/UI', desc: 'Interfaces that your teams actually want to use, every day.' },
  { icon: GitBranch, title: 'End-to-End Execution', desc: 'From discovery to deployment to long-term evolution.' },
  { icon: Shield, title: 'Enterprise-Grade Security', desc: 'Built-in compliance, encryption, and access controls from day one.' },
  { icon: ArrowUpRight, title: 'Measurable ROI', desc: 'Every engagement is tied to quantifiable business outcomes.' },
];

export default function WhyMavricSection() {
  const { theme } = useTheme();

  return (
    <section id="why-mavric" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: theme.accent1 }}>
              03 // Why Mavric
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-mavric-text mb-6 leading-tight">
              Not Just Code.{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}>
                Engineered Outcomes.
              </span>
            </h2>
            <p className="text-mavric-text-muted text-lg leading-relaxed max-w-md">
              We don't ship features — we deliver operational advantage. Every
              system is built with deep understanding of your business context,
              ensuring technology becomes your competitive edge.
            </p>
          </motion.div>

          {/* Right - grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-xl border p-5 transition-all duration-300 hover:border-white/10"
                style={{
                  background: 'rgba(16, 24, 43, 0.4)',
                  borderColor: 'rgba(248, 250, 252, 0.05)',
                }}
              >
                <d.icon size={18} className="mb-3" style={{ color: theme.accent1 }} />
                <h4 className="text-sm font-heading font-semibold text-mavric-text mb-1.5">
                  {d.title}
                </h4>
                <p className="text-xs text-mavric-text-muted leading-relaxed">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}