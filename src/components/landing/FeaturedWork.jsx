import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    tag: 'DASHBOARD EMPRESARIAL',
    title: 'Centro de Operaciones en Tiempo Real',
    challenge: 'Una empresa logística necesitaba visibilidad unificada de 12 oficinas regionales con sistemas de datos fragmentados.',
    solution: 'Construimos un centro de mando cloud-native con agregación de datos en vivo, vistas por rol y alertas predictivas.',
    outcome: 'Reducción del 40% en tiempo de respuesta. Visibilidad operativa completa en un solo panel.',
    gradient: ['#4F7CFF', '#22D3EE'],
  },
  {
    tag: 'AUTOMATIZACIÓN DE FLUJOS',
    title: 'Motor de Procesos Inteligente',
    challenge: 'Una firma financiera perdía más de 200 horas/mes en reconciliación manual de datos y controles de cumplimiento.',
    solution: 'Diseñamos una capa de automatización integrando su CRM, contabilidad y herramientas de compliance con reglas de validación inteligentes.',
    outcome: '85% de tareas manuales eliminadas. Reportes de cumplimiento 3x más rápidos.',
    gradient: ['#6D5EF9', '#7A3BFF'],
  },
  {
    tag: 'ANALÍTICA CON IA',
    title: 'Plataforma de Ingresos Predictivos',
    challenge: 'Una empresa SaaS no tenía visibilidad sobre señales de churn ni oportunidades de upsell en su base de clientes.',
    solution: 'Implementamos modelos ML personalizados para predicción de churn y un dashboard de analítica con recomendaciones accionables.',
    outcome: 'Reducción del 22% en churn. $1.2M en ingresos de upsell identificados en 6 meses.',
    gradient: ['#FF7A18', '#6D5EF9'],
  },
];

export default function FeaturedWork() {
  const { theme } = useTheme();

  return (
    <section id="work" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: theme.accent1 }}>
            04 // Trabajo Destacado
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 transition-colors duration-700" style={{ color: theme.textPrimary }}>
            Construido para{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: theme.btnBg }}>
              Rendir
            </span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group rounded-2xl border overflow-hidden transition-all duration-700"
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder,
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-6 p-6 md:p-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${c.gradient[0]}15, ${c.gradient[1]}15)`,
                        color: c.gradient[0],
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-5 transition-colors duration-700" style={{ color: theme.textPrimary }}>
                    {c.title}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Desafío', text: c.challenge },
                      { label: 'Solución', text: c.solution },
                      { label: 'Resultado', text: c.outcome },
                    ].map((item, j) => (
                      <div key={j}>
                        <div className="text-[10px] font-mono tracking-widest mb-1.5 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>
                          {item.label}
                        </div>
                        <p className="text-sm leading-relaxed transition-colors duration-700" style={{ color: theme.textSecondary }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${c.gradient[0]}20` }}
                  >
                    <ArrowUpRight size={16} style={{ color: c.gradient[0] }} />
                  </div>
                </div>
              </div>
              <div className="h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: `linear-gradient(90deg, ${c.gradient[0]}, ${c.gradient[1]})` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}