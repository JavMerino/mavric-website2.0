import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Code2, Workflow, Cloud, Brain } from 'lucide-react';

const solutions = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    desc: 'Bespoke platforms designed around your operations — not the other way around. Built for scale, speed, and long-term value.',
    tag: 'DEVELOPMENT',
  },
  {
    icon: Workflow,
    title: 'Business Process Automation',
    desc: 'Eliminate manual bottlenecks with intelligent automation that connects your workflows, systems, and teams seamlessly.',
    tag: 'AUTOMATION',
  },
  {
    icon: Cloud,
    title: 'Scalable Cloud Platforms',
    desc: 'Infrastructure engineered to grow with your business. Secure, resilient, and optimized for performance at any scale.',
    tag: 'CLOUD',
  },
  {
    icon: Brain,
    title: 'AI-Powered Tools & Analytics',
    desc: 'Transform raw data into strategic advantage with custom AI models, predictive analytics, and intelligent decision engines.',
    tag: 'AI / ML',
  },
];

function SolutionCard({ solution, index }) {
  const { theme } = useTheme();
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, v => `${v}px`);
  const glowY = useTransform(mouseY, v => `${v}px`);

  function handleMouse(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseMove={handleMouse}
      className="group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/10"
      style={{
        background: 'rgba(16, 24, 43, 0.5)',
        borderColor: 'rgba(248, 250, 252, 0.05)',
      }}
    >
      {/* Cursor glow */}
      <motion.div
        className="absolute w-60 h-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-0"
        style={{
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
          background: `radial-gradient(circle, ${theme.accent1}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-7">
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${theme.accent1}12` }}
          >
            <solution.icon size={20} style={{ color: theme.accent1 }} />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-mavric-text-muted px-2.5 py-1 rounded-full border" style={{ borderColor: 'rgba(248,250,252,0.08)' }}>
            {solution.tag}
          </span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-mavric-text mb-3">
          {solution.title}
        </h3>
        <p className="text-sm text-mavric-text-muted leading-relaxed font-body">
          {solution.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function SolutionsSection() {
  const { theme } = useTheme();

  return (
    <section id="solutions" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: theme.accent1 }}>
            02 // What We Build
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-mavric-text mb-4">
            Precision-Built{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}>
              Solutions
            </span>
          </h2>
          <p className="text-mavric-text-muted max-w-xl mx-auto text-lg">
            Every system we deliver is engineered for measurable business impact.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {solutions.map((s, i) => (
            <SolutionCard key={i} solution={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}