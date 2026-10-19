'use client';

import { useState } from 'react';
import { X, User, Mail, GraduationCap, Phone, Shield, Loader2, AlertCircle } from 'lucide-react';

// 1. Updated Interface matching StudentsClientWrapper
export interface AddStudentModalProps {
  isOpen: boolean;
  isPending?: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    email: string;
    grade: string;
    guardian: string;
    phone: string;
  }) => Promise<void> | void;
}

interface FormErrors {
  name?: string;
  email?: string;
  grade?: string;
  guardian?: string;
  phone?: string;
}

export function AddStudentModal({
  isOpen,
  isPending = false,
  onClose,
  onSubmit,
}: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'Grade 9',
    guardian: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmittingInternal, setIsSubmittingInternal] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.guardian.trim()) {
      newErrors.guardian = 'Guardian name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^\+?[0-9\s-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmittingInternal(true);
      await onSubmit(formData);
      handleReset();
    } finally {
      setIsSubmittingInternal(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      grade: 'Grade 9',
      guardian: '',
      phone: '',
    });
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const loading = isPending || isSubmittingInternal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Add New Student</h2>
            <p className="text-xs text-slate-400 mt-0.5">Enter credentials to enroll a new student in SchoolOS.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-indigo-400" /> Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Alexander Wright"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-slate-950 border ${
                errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
              } rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none transition-colors`}
            />
            {errors.name && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Address & Grade Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> School Email
              </label>
              <input
                type="email"
                placeholder="a.wright@schoolos.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-slate-950 border ${
                  errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none transition-colors`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Grade Level
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
          </div>

          {/* Guardian & Emergency Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> Guardian / Parent
              </label>
              <input
                type="text"
                placeholder="Eleanor Wright"
                value={formData.guardian}
                onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                className={`w-full bg-slate-950 border ${
                  errors.guardian ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none transition-colors`}
              />
              {errors.guardian && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.guardian}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400" /> Emergency Contact
              </label>
              <input
                type="text"
                placeholder="+1 (555) 019-2831"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-950 border ${
                  errors.phone ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none transition-colors`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition-colors font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Enrolling...
                </>
              ) : (
                'Enroll Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}