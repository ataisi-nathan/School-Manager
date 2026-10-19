'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardPreview from '@/components/DashboardPreview';
import FeatureCard from '@/components/FeatureCard';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Curriculum', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const trustedBy = ['Northgate', 'Westfield', 'Camberwell', 'St. Aldric', 'Brightpath'];

const stats = [
  { value: '99.8%', label: 'Satisfaction score', tone: 'text-indigo-600' },
  { value: '6+ yrs', label: 'Proven track record', tone: 'text-cyan-600' },
  { value: '1,200+', label: 'Connected schools', tone: 'text-indigo-600' },
  { value: '700k+', label: 'Students onboarded', tone: 'text-violet-600' },
];

const modules = [
  {
    code: 'CS-101',
    title: 'Foundations of Computing',
    desc: 'Computational thinking, algorithms and problem decomposition for early secondary learners.',
    meta: ['Grades 9–10', '12 weeks'],
  },
  {
    code: 'AI-204',
    title: 'Applied Artificial Intelligence',
    desc: 'Model behaviour, prompt design and responsible deployment explored through studio projects.',
    meta: ['Grades 11–12', '16 weeks'],
  },
  {
    code: 'DS-310',
    title: 'Data Science & Statistics',
    desc: 'Real datasets, visual storytelling and inference — assessed through continuous telemetry.',
    meta: ['Grades 11–12', '14 weeks'],
  },
  {
    code: 'WD-118',
    title: 'Web Systems & Interfaces',
    desc: 'From semantic markup to component architecture, with peer review built into every sprint.',
    meta: ['Grades 10–12', '10 weeks'],
  },
];

const testimonials = [
  {
    quote:
      'We replaced four disconnected tools with SchoolOS in a single term. Reporting that used to take a week now takes an afternoon.',
    name: 'Dr. Amara Okafor',
    role: 'Principal, Northgate Academy',
    initials: 'AO',
  },
  {
    quote:
      'The analytics layer is genuinely useful. We can see engagement drop in week three and intervene before grades slip.',
    name: 'Michael Trent',
    role: 'Head of Curriculum, Westfield',
    initials: 'MT',
  },
  {
    quote:
      'Onboarding 4,200 students took nine days. Support was responsive and the migration tooling did exactly what it promised.',
    name: 'Sofia Marchetti',
    role: 'Director of Operations, Brightpath',
    initials: 'SM',
  },
];

const integrations = ['Google Classroom', 'Canvas', 'Zoom', 'Stripe', 'Twilio', 'QuickBooks'];

const milestones = [
  'Zero-latency cloud sync across desktop and mobile',
  'Turnkey adoption for institutions above 5,000 students',
  'Built-in future curriculum tracking — AI, Web3 and Data Science',
  'SOC 2 Type II controls with regional data residency',
];

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
    <div className="relative isolate min-h-screen overflow-x-clip bg-white font-sans text-slate-600 antialiased selection:bg-indigo-200 selection:text-indigo-900">
      {/* ============ Ambient background ============ */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-225" style={gridStyle} />
        <div className="absolute left-1/2 top-80 h-155 w-250 -translate-x-1/2 rounded-full bg-indigo-200/50 blur-[140px]" />
        <div className="absolute left-50 top-250 h-115 w-115 rounded-full bg-violet-200/50 blur-[140px]" />
        <div className="absolute right-55 top-500 h-120 w-120 rounded-full bg-cyan-200/50 blur-[140px]" />
        <div className="absolute left-1/2 top-825 h-105 w-180 -translate-x-1/2 rounded-full bg-indigo-100/70 blur-[140px]" />
      </div>

      {/* ============ Announcement bar ============ */}
      <div className="relative z-40 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-6 text-[11px] sm:text-xs">
          <span className="hidden rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:inline-block">
            New
          </span>
          <span className="text-white/95">SchoolOS 3.0 — the AI grade assistant is now live.</span>
          <Link
            href="#features"
            className="hidden font-semibold text-white underline underline-offset-4 hover:text-white/80 sm:inline"
          >
            Read the changelog →
          </Link>
        </div>
      </div>

      {/* ============ Navigation ============ */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25">
              <span className="text-sm font-black text-white">S</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">
              SchoolOS<span className="text-indigo-600">.ai</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/login" className="text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900">
              Sign in
            </Link>
            <Link
              href="/demo"
              className="rounded-full bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
            >
              Start free trial
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-900 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {isMenuOpen && (
          <nav className="border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-xl md:hidden">
            <div className="flex flex-col">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-slate-100 py-3 text-sm text-slate-700 transition-colors hover:text-indigo-600"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="py-3 text-sm text-slate-700 transition-colors hover:text-indigo-600"
              >
                Sign in
              </Link>
              <Link
                href="/demo"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 rounded-xl bg-slate-900 py-3 text-center text-sm font-semibold text-white shadow-md"
              >
                Start free trial
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* ============ Hero ============ */}
        <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 text-center sm:pt-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white py-1 pl-1 pr-4 text-xs shadow-sm">
            <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              v2026
            </span>
            <span className="text-slate-600">Trusted by 1,200+ institutions worldwide</span>
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-[2.5rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem]">
            The operating system for{' '}
            <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              modern schools
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Replace administrative friction with one connected platform. Real-time telemetry, automated
            grading pipelines and curriculum tracking — built for institutions that intend to lead.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/35 sm:w-auto"
            >
              Start instant free trial
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
            >
              <svg className="h-4 w-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 4.3a1 1 0 011.5-.87l8 5a1 1 0 010 1.74l-8 5A1 1 0 016.3 14.3v-10z" />
              </svg>
              See platform tour
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-500">
            14-day free trial · No credit card required · SOC 2 Type II ready
          </p>

          {/* Product frame */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div
              aria-hidden
              className="absolute -inset-x-8 -top-10 bottom-6 rounded-[40px] bg-linear-to-tr from-indigo-200/60 via-violet-200/60 to-cyan-200/60 blur-3xl"
            />
            <div className="relative rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-900/10">
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="mx-auto hidden items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] text-slate-500 sm:flex">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  app.schoolos.ai/dashboard
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <DashboardPreview />
              </div>
            </div>
          </div>

          {/* Logo cloud */}
          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Powering academic operations at
            </p>
            <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
              {trustedBy.map((name) => (
                <span
                  key={name}
                  className="text-center text-lg font-semibold tracking-tight text-slate-400 transition-colors hover:text-slate-600"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Features ============ */}
        <section id="features" className="relative border-t border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Platform</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything your institution needs to run
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Purpose-built modules that replace spreadsheets, disconnected portals and manual reporting.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <FeatureCard
                title="Automated Analytics"
                description="Continuous tracking of student performance metrics, attendance signals and engagement telemetry."
                badge="Real-time"
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
              />
              <FeatureCard
                title="Seamless Operations"
                description="Unify fees, enrolment pipelines, staff scheduling and communication under a single roof."
                badge="Cloud native"
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              />
              <FeatureCard
                title="Next-Gen Security"
                description="Role-based access control, encrypted data pipelines and strict privacy compliance by default."
                badge="Enterprise"
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
            </div>

            {/* Bento row */}
            <div className="mt-6 grid gap-6 lg:grid-cols-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-3">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Live engagement telemetry</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                      Weekly attendance and participation signals, streamed from every classroom and rolled up
                      into a single institutional view.
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 sm:inline-block">
                    +12.4%
                  </span>
                </div>

                <div className="mt-8 flex h-32 items-end gap-2 sm:gap-3">
                  {[38, 55, 44, 72, 60, 88, 76, 96].map((height, index) => (
                    <div key={index} className="flex-1">
                      <div
                        className="w-full rounded-t-md bg-linear-to-t from-indigo-200 to-indigo-500 transition-all hover:from-indigo-300 hover:to-indigo-400"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-[10px] uppercase tracking-wider text-slate-400">
                  <span>Week 1</span>
                  <span>Week 8</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900">Plugs into your stack</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Native connectors for the tools your staff already use every day.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {integrations.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <Link
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
                >
                  Request a connector
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Curriculum ============ */}
        <section id="courses" className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Curriculum</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Future-ready course tracking
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Ship modern computing, AI and data programmes with built-in progression, assessment and
                  reporting.
                </p>
              </div>
              <Link
                href="/demo"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                Browse full catalogue
              </Link>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <article
                  key={module.code}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-indigo-600">
                    {module.code}
                  </span>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900">{module.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{module.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                    {module.meta.map((tag) => (
                      <span key={tag} className="text-[11px] font-medium text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Stats ============ */}
        <section className="border-y border-slate-200 bg-linear-to-br from-slate-50 to-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`px-2 text-center lg:px-8 ${index !== 0 ? 'lg:border-l lg:border-slate-200' : ''}`}
                >
                  <dd className={`text-3xl font-bold tracking-tight sm:text-4xl ${stat.tone}`}>{stat.value}</dd>
                  <dt className="mt-2 text-xs uppercase tracking-wider text-slate-500">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ============ Testimonials ============ */}
        <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Customers</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by the people who run schools
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <svg className="h-6 w-6 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5V6zm10 0a5.17 5.17 0 00-5.17 5.17V18h6.83v-6.83h-3.33A1.67 1.67 0 0117.17 9.5V6z" />
                </svg>
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-slate-700">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-indigo-500 to-violet-600 text-[11px] font-bold text-white">
                    {item.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-900">{item.name}</span>
                    <span className="block truncate text-xs text-slate-500">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ============ About / Founder ============ */}
        <section id="about" className="border-t border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Leadership vision
                </span>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  Designed by educators, engineered by specialists
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-600">
                  We built SchoolOS to eliminate administrative busywork so educators can focus entirely on
                  inspiring students. Every feature is designed with speed, privacy and clarity in mind.
                </p>

                <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                    AN
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Ataisi Nathan</p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-indigo-600">
                      Founder & Principal Architect
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Key milestones</p>
                <ul className="mt-6 space-y-5">
                  {milestones.map((milestone) => (
                    <li key={milestone} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-600">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed text-slate-700">{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Contact ============ */}
        <section id="contact" className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Get started
                </span>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  Request platform access
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  Have custom requirements or need a guided walkthrough? Send us the details and our
                  engineering team will get back to you within one business day.
                </p>

                <ul className="mt-10 space-y-5">
                  {[
                    { label: 'Response time', value: 'Under 24 hours' },
                    { label: 'Onboarding', value: 'Guided migration included' },
                    { label: 'Email', value: 'team@schoolos.ai' },
                  ].map((row) => (
                    <li key={row.label} className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <span className="text-sm text-slate-500">{row.label}</span>
                      <span className="text-sm font-medium text-slate-900">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium text-slate-700">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-700">
                      Institutional email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="jane@academy.edu"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-xs font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={4}
                      placeholder="Tell us about your school's current setup..."
                      className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                      Failed to send transmission. Please check your connection and try again.
                    </p>
                  )}
                  {formStatus === 'success' && (
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
                      Message transmitted successfully. Our team will contact you within 24 hours.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full cursor-pointer rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/35 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Transmitting data…' : 'Submit demo inquiry'}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    By submitting you agree to our privacy policy. We never share institutional data.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ Footer ============ */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
                  <span className="text-sm font-black text-white">S</span>
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-slate-900">
                  SchoolOS<span className="text-indigo-600">.ai</span>
                </span>
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">
                The connected operating platform for modern educational institutions. Built for speed,
                privacy and clarity.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {[
                  {
                    label: 'X',
                    path: 'M18.9 2H22l-6.8 7.8L22.8 22h-6.3l-4.9-6.4L5.9 22H2.8l7.3-8.3L1.6 2h6.4l4.4 5.9L18.9 2z',
                  },
                  {
                    label: 'GitHub',
                    path: 'M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z',
                  },
                  {
                    label: 'LinkedIn',
                    path: 'M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.5 4.7 5.9V21h-4v-5.6c0-1.4 0-3.2-1.9-3.2s-2.2 1.5-2.2 3.1V21h-4V9z',
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-700"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Curriculum', 'Integrations', 'Pricing', 'Changelog'] },
              { title: 'Company', links: ['About', 'Careers', 'Customers', 'Press', 'Contact'] },
              { title: 'Resources', links: ['Documentation', 'API reference', 'Security', 'Status', 'Support'] },
            ].map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
            <p className="text-xs text-slate-400">
              © 2026 SchoolOS.ai — Engineered for modern educational institutions.
            </p>
            <p className="text-xs text-slate-400">
              Created by <span className="font-medium text-slate-600">Ataisi Nathan</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const gridStyle: React.CSSProperties = {
  backgroundImage:
    'linebg-linear-to-br, rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.055) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
  maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 45%, transparent 100%)',
  WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 45%, transparent 100%)',
};