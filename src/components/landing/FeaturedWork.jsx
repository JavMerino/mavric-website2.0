import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    tag: 'ENTERPRISE DASHBOARD',
    title: 'Real-Time Operations Hub',
    challenge: 'A logistics company needed unified visibility across 12 regional offices with fragmented data systems.',
    solution: 'Built a cloud-native command center with live data aggregation, role-based views, and predictive alerts.',
    outcome: '40% reduction in response time. Complete operational visibility in a single pane.',
    gradient: ['#4F7CFF', '#22D3EE'],
  },
  {
    tag: 'WORKFLOW AUTOMATION',
    title: 'Intelligent Process Engine',
    challenge: 'A financial services firm was losing 200+ hours/month to manual data reconciliation and compliance checks.',
    solution: 'Designed an automation layer integrating their CRM, accounting, and compliance tools with smart validation rules.',
    outcome: '85% of manual tasks eliminated. 3x faster compliance reporting.',
    gradient: ['#6D5EF9', '#7A3BFF'],
  },
  {
    tag: 'AI ANALYTICS',
    title: 'Predictive Revenue Platform',
    challenge: 'A SaaS company lacked insight into churn signals and upsell opportunities across their customer base.',
    solution: 'Deployed custom ML models for churn prediction and built an analytics dashboard with actionable recommendations.',
    outcome: '22% reduction in churn. $1.2M in identified upsell revenue within 6 months.',
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
            04 // Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-mavric-text mb-4">
            Built to{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}>
              Perform
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
              className="group rounded-2xl border overflow-hidden transition-all duration-500 hover:border-white/10"
              style={{
                background: 'rgba(16, 24, 43, 0.5)',
                borderColor: 'rgba(248, 250, 252, 0.05)',
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
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-mavric-text mb-5">
                    {c.title}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Challenge', text: c.challenge },
                      { label: 'Solution', text: c.solution },
                      { label: 'Outcome', text: c.outcome },
                    ].map((item, j) => (
                      <div key={j}>
                        <div className="text-[10px] font-mono tracking-widest text-mavric-text-muted mb-1.5 uppercase">
                          {item.label}
                        </div>
                        <p className="text-sm text-mavric-text-dim leading-relaxed">
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
              {/* Bottom accent line */}
              <div className="h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: `linear-gradient(90deg, ${c.gradient[0]}, ${c.gradient[1]})` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}