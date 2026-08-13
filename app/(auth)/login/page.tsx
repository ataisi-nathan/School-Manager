'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setErrorMessage(data.message || 'Invalid email or password. Please try again.');
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
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-linear-to-r from-indigo-900/15 blur-[150px] pointer-events-none -z-10" />

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
          
          {/* Left Column: Hero Text */}
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Secure Demo Access
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Welcome back to <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-300 to-cyan-400">
                SchoolOS.ai
              </span>
            </h1>

            <p className="text-slate-400 text-base leading-relaxed">
              Log in to explore the live trial environment, access automated student analytics, and manage institution workflows.
            </p>

            <div className="pt-2 text-sm text-slate-400">
              Don’t have an account yet?{' '}
              <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
                Create an account
              </Link>
            </div>
          </div>

          {/* Right Column: Glassmorphism Login Card */}
          <div className="relative group">
            {/* Outer Accent Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition duration-500" />

            <div className="relative bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">Sign In</h2>
                <p className="text-slate-400 text-xs">Enter your credentials to access the 7-day trial portal.</p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-950/60 border border-rose-800/60 rounded-xl text-rose-300 text-xs text-center animate-fadeIn">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Username / Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      required
                      placeholder="admin@school.edu"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Password
                    </label>
                    <Link href="#" className="text-[11px] text-indigo-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Log In to Dashboard'
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