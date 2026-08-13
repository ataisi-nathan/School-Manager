'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardPreview from '@/components/DashboardPreview';
import FeatureCard from '@/components/FeatureCard';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(event.currentTarget);
    const objectData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased relative overflow-x-hidden">
      {/* Background Lighting Visuals */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[1400px] left-0 w-[500px] h-[500px] bg-indigo-900/20 blur-[160px] pointer-events-none -z-10" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <span className="font-black text-white text-xl">S</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300 tracking-tight">
              SchoolOS<span className="text-indigo-400">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <Link href="#features" className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all">
              Features
            </Link>
            <Link href="#about" className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all">
              About
            </Link>
            <Link href="#courses" className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all">
              Curriculum
            </Link>
            <Link href="#contact" className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all"
            >
              Launch Live Demo
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
            aria-label="Toggle Navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <nav className="md:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 space-y-4">
            <Link href="#features" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">Features</Link>
            <Link href="#about" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">About</Link>
            <Link href="#courses" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">Curriculum</Link>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">Contact</Link>
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-indigo-600 font-semibold rounded-xl text-white shadow-lg"
            >
              Launch Demo
            </Link>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              School Management System v2026
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Next-Gen Intelligence for <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Modern Academics</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Replace outdated administrative friction with an all-in-one operating platform. Real-time telemetry, automated grading pipelines, and curriculum tracking tailored for future-focused schools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/demo"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all text-center"
              >
                Start Instant Free Trial
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl border border-slate-800 transition-all text-center"
              >
                See Platform Tour
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <DashboardPreview />
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/60">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Built for High Performance</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Everything your institution needs to thrive</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Automated Analytics"
              description="Continuous tracking of student performance metrics, attendance signals, and engagement telemetry."
              badge="Real-time"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            />
            <FeatureCard
              title="Seamless Operations"
              description="Unify fees, enrollment pipelines, staff schedules, and communication channels under one roof."
              badge="Cloud Native"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            />
            <FeatureCard
              title="Next-Gen Security"
              description="Role-based access control, encrypted data pipelines, and strict data privacy compliance."
              badge="Enterprise"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            />
          </div>
        </section>

        {/* Founder & Mission Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/60">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Leadership Vision</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Designed by Educators, Engineerd by Specialists</h2>
              <p className="text-slate-400 leading-relaxed">
                "We built SchoolOS to eliminate administrative busywork, letting educators focus entirely on inspiring students. Every feature is designed with speed, privacy, and clarity in mind."
              </p>
              <div className="pt-2">
                <p className="text-lg font-bold text-white">Ataisi Nathan</p>
                <p className="text-xs text-indigo-400 font-mono">Founder & Principal Architect</p>
              </div>
            </div>
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl relative overflow-hidden">
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p className="text-indigo-300 font-semibold">Key Milestones:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Zero latency cloud sync across desktop & mobile
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Turnkey adoption for schools with over 5,000 students
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Built-in future curriculum tracking (Web3, AI & Data Science)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <div className="pt-4 md:pt-0">
                <p className="text-4xl font-extrabold text-indigo-400">99.8%</p>
                <p className="text-xs text-slate-400 mt-2">Satisfaction Score</p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="text-4xl font-extrabold text-cyan-400">6+ Yrs</p>
                <p className="text-xs text-slate-400 mt-2">Proven Track Record</p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="text-4xl font-extrabold text-indigo-400">1,200+</p>
                <p className="text-xs text-slate-400 mt-2">Connected Schools</p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="text-4xl font-extrabold text-purple-400">700k+</p>
                <p className="text-xs text-slate-400 mt-2">Students Onboarded</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-extrabold text-white">Request Platform Access</h2>
              <p className="text-slate-400 text-sm">Have custom requirements or need a demo? Get in touch with our engineering team.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Institutional Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="jane@academy.edu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your school's current setup..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none"
                />
              </div>

              {formStatus === 'error' && (
                <p className="text-xs text-rose-400 text-center bg-rose-950/50 p-3 rounded-lg border border-rose-800/50">
                  Failed to send transmission. Please check your network connection and try again.
                </p>
              )}
              {formStatus === 'success' && (
                <p className="text-xs text-emerald-400 text-center bg-emerald-950/50 p-3 rounded-lg border border-emerald-800/50">
                  Message transmitted successfully. Our team will contact you within 24 hours.
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 cursor-pointer text-sm"
              >
                {formStatus === 'submitting' ? 'Transmitting Data...' : 'Submit Demo Inquiry'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 SchoolOS.ai. Engineered for Modern Educational Institutions.</p>
          <p>Created by <span className="text-slate-300 font-medium">Ataisi Nathan</span></p>
        </div>
      </footer>
    </div>
  );
}