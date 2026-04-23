import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

const team = [
  {
    name: 'Carlos Méndez',
    role: 'CEO & Co-Founder',
    desc: 'Lidera la visión estratégica y el crecimiento de Mavric, con más de 12 años de experiencia en soluciones tecnológicas empresariales.',
    avatar: 'CM',
    color: '#2563EB',
  },
  {
    name: 'Lucía Torres',
    role: 'CTO',
    desc: 'Arquitecta de software con enfoque en plataformas cloud escalables, seguridad e inteligencia artificial aplicada.',
    avatar: 'LT',
    color: '#0891B2',
  },
  {
    name: 'Andrés Ruiz',
    role: 'Lead Developer',
    desc: 'Full-stack developer especializado en automatización de procesos y desarrollo de APIs de alto rendimiento.',
    avatar: 'AR',
    color: '#7C3AED',
  },
  {
    name: 'Valentina Flores',
    role: 'Head of Design',
    desc: 'Diseñadora UX/UI con pasión por crear interfaces elegantes, intuitivas y centradas en la experiencia del usuario.',
    avatar: 'VF',
    color: '#EA580C',
  },
];

function TeamCard({ member, index }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl border overflow-hidden transition-all duration-700"
      style={{
        background: theme.isLight
          ? 'rgba(255, 255, 255, 0.35)'
          : 'rgba(15, 23, 50, 0.4)',
        borderColor: theme.isLight
          ? 'rgba(15, 23, 42, 0.08)'
          : 'rgba(248, 250, 252, 0.07)',
        backdropFilter: 'blur(20px)',
        boxShadow: theme.isLight
          ? '0 4px 24px rgba(0,0,0,0.04)'
          : `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      <div className="p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-heading font-bold text-lg"
            style={{
              background: `linear-gradient(135deg, ${member.color}, ${member.color}CC)`,
              boxShadow: `0 0 20px ${member.color}30`,
            }}
          >
            {member.avatar}
          </div>
          <div>
            <h3
              className="font-heading font-semibold text-base transition-colors duration-700"
              style={{ color: theme.textPrimary }}
            >
              {member.name}
            </h3>
            <span
              className="text-xs font-mono tracking-wider"
              style={{ color: member.color }}
            >
              {member.role}
            </span>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed transition-colors duration-700"
          style={{ color: theme.textMuted }}
        >
          {member.desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-700"
        style={{ background: member.color }}
      />
    </motion.div>
  );
}

export default function TeamSection() {
  const { theme } = useTheme();

  return (
    <section id="team" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-4 block"
            style={{ color: theme.accent1 }}
          >
            05 // Equipo
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 transition-colors duration-700"
            style={{ color: theme.textPrimary }}
          >
            Conoce al{' '}
            <span style={{ color: theme.highlightColor }}>Equipo</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-lg transition-colors duration-700"
            style={{ color: theme.textMuted }}
          >
            Profesionales apasionados por la tecnología, comprometidos con
            entregar soluciones que transforman negocios.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <TeamCard key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}