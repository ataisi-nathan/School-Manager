'use client';

import { useState } from 'react';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'analytics'>('overview');

  return (
    <div className="relative group w-full">
      {/* Outer Gradient Glow */}
      <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700" />

      {/* Main Glass Screen Container */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Mock Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex bg-slate-900 p-1 rounded-lg cursor-pointer border border-slate-800 text-xs text-slate-400">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-md transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'hover:text-slate-200'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-3 py-1 rounded-md transition-all ${activeTab === 'students' ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'hover:text-slate-200'}`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1 rounded-md transition-all ${activeTab === 'analytics' ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'hover:text-slate-200'}`}
            >
              Analytics
            </button>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">v2.4 Live System</span>
        </div>

        {/* Dynamic Mock Content */}
        <div className="p-6 space-y-6 min-h-90 flex flex-col justify-between">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-400">Total Enrolled</p>
                  <p className="text-2xl font-bold text-white mt-1">2,840</p>
                  <span className="text-[11px] text-emerald-400 mt-1 inline-block">↑ +12% this term</span>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-400">Attendance Rate</p>
                  <p className="text-2xl font-bold text-white mt-1">96.8%</p>
                  <span className="text-[11px] text-emerald-400 mt-1 inline-block">↑ Optimal</span>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-400">Active Courses</p>
                  <p className="text-2xl font-bold text-white mt-1">42</p>
                  <span className="text-[11px] text-indigo-400 mt-1 inline-block">3 pending review</span>
                </div>
              </div>

              {/* Mock Activity Chart */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Weekly Student Engagement</span>
                  <span className="text-slate-500">Real-time telemetry</span>
                </div>
                <div className="h-24 flex items-end gap-2 pt-2">
                  {[40, 65, 55, 85, 95, 75, 90].map((height, i) => (
                    <div key={i} className="flex-1 bg-slate-800/80 rounded-t-sm relative overflow-hidden h-full flex items-end">
                      <div
                        className="w-full bg-linear-to-t from-indigo-600 to-cyan-400 rounded-t-sm transition-all duration-500"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Recent Student Records</div>
              {[
                { name: 'Sarah Jenkins', grade: 'Grade 11 - Computer Science', status: 'Active', gpa: '3.98' },
                { name: 'Marcus Chen', grade: 'Grade 10 - Data Analytics', status: 'Active', gpa: '3.85' },
                { name: 'Elena Rostova', grade: 'Grade 12 - Advanced Math', status: 'On Leave', gpa: '3.92' },
              ].map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                      {student.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-200">{student.name}</p>
                      <p className="text-[11px] text-slate-500">{student.grade}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-indigo-400">GPA {student.gpa}</span>
                    <p className="text-[10px] text-slate-500">{student.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2">
                <span className="text-xs font-semibold text-indigo-300">AI Insight Engine</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Predictive analysis indicates a 14% improvement in course completion when automated study alerts are enabled for Grade 10 modules.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                  <p className="text-xs text-slate-400">Server Uptime</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">99.99%</p>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                  <p className="text-xs text-slate-400">Avg Sync Latency</p>
                  <p className="text-lg font-bold text-cyan-400 mt-1">12ms</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>System Status: <span className="text-emerald-400">All Nodes Operational</span></span>
            <span>Cloud Architecture v2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}