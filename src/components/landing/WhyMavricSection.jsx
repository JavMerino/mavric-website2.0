import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Target, Layers, Shield, ArrowUpRight, Palette, GitBranch } from 'lucide-react';

const differentiators = [
  { icon: Target, title: 'Enfoque Estratégico', desc: 'Mapeamos el software según tu lógica de negocio — no al revés.' },
  { icon: Layers, title: 'Arquitectura Escalable', desc: 'Sistemas diseñados para crecer 10x sin necesidad de rediseño.' },
  { icon: Palette, title: 'UX/UI Impecable', desc: 'Interfaces que tus equipos realmente quieren usar, todos los días.' },
  { icon: GitBranch, title: 'Ejecución de Extremo a Extremo', desc: 'Desde el descubrimiento hasta el despliegue y la evolución continua.' },
  { icon: Shield, title: 'Seguridad Empresarial', desc: 'Cumplimiento, cifrado y controles de acceso integrados desde el día uno.' },
  { icon: ArrowUpRight, title: 'ROI Medible', desc: 'Cada proyecto está vinculado a resultados de negocio cuantificables.' },
];

export default function WhyMavricSection() {
  const { theme } = useTheme();

  return (
    <section id="why-mavric" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: theme.accent1 }}>
              03 // Por Qué Mavric
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6 leading-tight transition-colors duration-700" style={{ color: theme.textPrimary }}>
              No Solo Código.{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: theme.btnBg }}>
                Resultados Diseñados.
              </span>
            </h2>
            <p className="text-lg leading-relaxed max-w-md transition-colors duration-700" style={{ color: theme.textMuted }}>
              No entregamos funcionalidades — entregamos ventaja operativa. Cada
              sistema se construye con profundo entendimiento de tu contexto de negocio,
              asegurando que la tecnología se convierta en tu diferencial competitivo.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-xl border p-5 transition-all duration-700"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.cardBorder,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <d.icon size={18} className="mb-3" style={{ color: theme.accent1 }} />
                <h4 className="text-sm font-heading font-semibold mb-1.5 transition-colors duration-700" style={{ color: theme.textPrimary }}>
                  {d.title}
                </h4>
                <p className="text-xs leading-relaxed transition-colors duration-700" style={{ color: theme.textMuted }}>
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