'use client';

import { Search, Filter, Download, Plus, RefreshCw } from 'lucide-react';

interface StudentFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGrade: string;
  setSelectedGrade: (g: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  onAddStudent: () => void;
}

export function StudentFilters({
  searchQuery,
  setSearchQuery,
  selectedGrade,
  setSelectedGrade,
  selectedStatus,
  setSelectedStatus,
  onAddStudent,
}: StudentFiltersProps) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by student name, ID, or email..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Filter Dropdowns & Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="All">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="At Risk">At Risk</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedGrade('All');
            setSelectedStatus('All');
          }}
          title="Reset Filters"
          className="p-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors hover:bg-slate-800"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        <button className="px-3 py-2 bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export CSV
        </button>

        <button
          onClick={onAddStudent}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>
    </div>
  );
}