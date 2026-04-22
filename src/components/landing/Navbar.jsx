import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

const navLinks = [
  { label: 'Services', href: '#solutions' },
  { label: 'Solutions', href: '#why-mavric' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(7, 11, 20, 0.85)'
            : 'rgba(7, 11, 20, 0.3)',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'blur(8px)',
          borderBottom: scrolled
            ? '1px solid rgba(248, 250, 252, 0.06)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm"
              style={{
                background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
              }}
            >
              M
            </div>
            <span className="font-heading font-semibold text-mavric-text tracking-tight text-lg">
              MAVRIC
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-mavric-text-muted hover:text-mavric-text transition-colors duration-300 font-body"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 rounded-lg text-sm font-medium text-mavric-text transition-all duration-300 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                boxShadow: `0 0 20px ${theme.glow}`,
              }}
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-mavric-text p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(7, 11, 20, 0.95)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-mavric-text-muted hover:text-mavric-text text-lg font-body transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 px-5 py-3 rounded-lg text-center font-medium text-mavric-text"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                }}
                onClick={() => setMobileOpen(false)}
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}