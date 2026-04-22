import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative py-16 px-6 border-t" style={{ borderColor: 'rgba(248,250,252,0.05)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-xs"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                }}
              >
                M
              </div>
              <span className="font-heading font-semibold text-mavric-text tracking-tight">
                MAVRIC TECHNOLOGIES
              </span>
            </div>
            <p className="text-sm text-mavric-text-muted leading-relaxed max-w-xs">
              Precision-engineered software systems, automation, and AI
              solutions for forward-thinking businesses.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono tracking-widest text-mavric-text-muted mb-4 uppercase">Company</h4>
              <div className="flex flex-col gap-3">
                {['Services', 'Solutions', 'Work', 'Contact'].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-mavric-text-dim hover:text-mavric-text transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-mono tracking-widest text-mavric-text-muted mb-4 uppercase">Connect</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@mavrictechnologies.com" className="text-sm text-mavric-text-dim hover:text-mavric-text transition-colors">
                  Email Us
                </a>
                <a href="#" className="text-sm text-mavric-text-dim hover:text-mavric-text transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-mavric-text-muted mb-4 uppercase">Get in Touch</h4>
            <a href="mailto:hello@mavrictechnologies.com" className="text-sm hover:text-mavric-text transition-colors" style={{ color: theme.accent1 }}>
              hello@mavrictechnologies.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(248,250,252,0.05)' }}>
          <p className="text-xs text-mavric-text-muted">
            © {new Date().getFullYear()} Mavric Technologies. All rights reserved.
          </p>
          <p className="text-xs text-mavric-text-muted font-mono">
            Engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}