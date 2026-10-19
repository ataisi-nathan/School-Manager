import { Suspense } from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';
import { getStudents, getStudentStats } from './actions';
import { StudentStats } from './_components/StudentStats';
import { StudentsClientWrapper } from './_components/StudentsClientWrapper';

export default async function StudentsPage() {
  // Fetch table data and database stats concurrently on the server
  const [initialStudents, stats] = await Promise.all([
    getStudents(),
    getStudentStats(),
  ]);

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-indigo-400" />
          Students Directory
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Monitor academic standing, record attendance, and manage active student enrollments.
        </p>
      </div>

      {/* Stats Summary - Now consuming live database stats */}
      <StudentStats stats={stats} />

      {/* Interactive Client Component for Search, Filters, Table, & Modal */}
      <Suspense fallback={<StudentsLoadingSkeleton />}>
        <StudentsClientWrapper initialStudents={initialStudents} stat={stats} />
      </Suspense>
    </div>
  );
}

function StudentsLoadingSkeleton() {
  return (
    <div className="p-12 text-center text-slate-500 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-center gap-2">
      <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
      <span className="text-xs font-medium">Loading student records...</span>
    </div>
  );
}