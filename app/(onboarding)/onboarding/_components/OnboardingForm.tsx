'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Building2, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon,
  X 
} from 'lucide-react';
import { completeOnboarding } from '@/app/actions/onboarding';

export function OnboardingForm() {
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  // Form States
  const [schoolName, setSchoolName] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle Logo File Selection & Preview Conversion
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic file size check (Max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!schoolName.trim()) {
      setError('Please enter a valid school name.');
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const res = await completeOnboarding({
          schoolName: schoolName.trim(),
          logoUrl: logoPreview || undefined,
        });

        if (!res.success) {
          setError(res.error || 'Failed to complete onboarding.');
          return;
        }

        // 🔄 Instantly update NextAuth JWT session with new schoolId & onboarded status
        await update({
          schoolId: res.schoolId,
          isOnboarded: 'true',
        });

        // Redirect directly to multi-tenant dashboard
        router.push('/dashboard');
        router.refresh();
      } catch (err) {
        console.error('Onboarding submit error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Building2 className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Setup Your School Workspace</h2>
        <p className="text-xs text-slate-400 mt-1">
          Provide your school details to configure your multi-tenant environment.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* School Name Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            School Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              disabled={isPending}
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. Apex International Academy"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            School Branding Logo <span className="text-slate-500 font-normal">(Optional)</span>
          </label>

          {logoPreview ? (
            <div className="relative w-full p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg border border-slate-700 overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img src={logoPreview} alt="School Logo Preview" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Logo Uploaded
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Ready for dashboard rendering</p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeLogo}
                disabled={isPending}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-950/40 hover:bg-slate-950/80 rounded-xl cursor-pointer transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <div className="p-2.5 bg-slate-900 border border-slate-800 group-hover:border-indigo-500/30 rounded-xl mb-2 transition-colors">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <p className="text-xs font-medium text-slate-300">
                  <span className="text-indigo-400 underline underline-offset-2">Click to upload</span> or drag and drop
                </p>
                <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, SVG or WEBP (Max 2MB)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                disabled={isPending}
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Setting Up Workspace...</span>
            </>
          ) : (
            <span>Complete Setup & Launch Workspace</span>
          )}
        </button>
      </form>
    </div>
  );
}