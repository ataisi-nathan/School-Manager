'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, Lock, Mail, User, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('fullName') as string;
    const schoolName = formData.get('schoolName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, schoolName, email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setErrorMessage(data.message || 'Failed to create an account. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-linear-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-purple-900/15 blur-[150px] pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Hero Text & Features */}
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Start Your 7-Day Free Trial
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Transform your school management with <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-300 to-cyan-400">
                SchoolOS.ai
              </span>
            </h1>

            <p className="text-slate-400 text-base leading-relaxed">
              Get full access to all features, AI student tracking, and automated reporting. No credit card required.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-300 inline-block text-left">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Instant trial deployment in under 2 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Unlimited administrative access during trial</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Enterprise encryption & FERPA compliant</span>
              </div>
            </div>

            <div className="pt-4 text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
                Log in here
              </Link>
            </div>
          </div>

          {/* Right Column: Glassmorphism Registration Form */}
          <div className="relative group">
            {/* Outer Accent Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition duration-500" />

            <div className="relative bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <p className="text-slate-400 text-xs">Fill in your details to set up your school dashboard.</p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-950/60 border border-rose-800/60 rounded-xl text-rose-300 text-xs text-center animate-fadeIn">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* School/Institution Name */}
                <div>
                  <label htmlFor="schoolName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    School / Institution Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="schoolName"
                      id="schoolName"
                      required
                      placeholder="St. Jude Academy"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="admin@school.edu"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Confirm
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm mt-4"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Setting up workspace...
                    </>
                  ) : (
                    'Start Free Trial'
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-600">
        © 2026 SchoolOS.ai. Protected by enterprise-grade encryption.
      </footer>
    </main>
  );
}