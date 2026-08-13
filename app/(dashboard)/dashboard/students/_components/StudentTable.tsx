'use client';

import { useState } from 'react';
import { Eye, Edit, MoreHorizontal, ChevronLeft, ChevronRight, X, Mail, Phone, Calendar } from 'lucide-react';

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  status: 'Active' | 'At Risk' | 'Suspended';
  gpa: string;
  attendance: string;
  guardian: string;
  phone: string;
  joinedDate: string;
}

interface StudentTableProps {
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <>
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider sticky top-0">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">ID</th>
                <th className="p-4">Grade</th>
                <th className="p-4">GPA</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="p-4 font-semibold text-white">
                      <div>
                        <p className="text-white group-hover:text-indigo-300 transition-colors">
                          {student.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-normal">{student.email}</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-400">{student.id}</td>
                    <td className="p-4">{student.grade}</td>
                    <td className="p-4 font-mono text-cyan-400 font-medium">{student.gpa}</td>
                    <td className="p-4 font-mono">{student.attendance}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          student.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : student.status === 'At Risk'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                          title="More Options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No students match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {students.length} students</span>
          <div className="flex items-center gap-2">
            <button disabled className="p-1.5 border border-slate-800 rounded-lg text-slate-600 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono">1 / 1</span>
            <button disabled className="p-1.5 border border-slate-800 rounded-lg text-slate-600 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Details Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">Student Profile</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xl shadow-lg">
                    {selectedStudent.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{selectedStudent.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{selectedStudent.id}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {selectedStudent.grade}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Cumulative GPA</p>
                    <p className="text-lg font-mono font-bold text-cyan-400">{selectedStudent.gpa}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Attendance Rate</p>
                    <p className="text-lg font-mono font-bold text-emerald-400">{selectedStudent.attendance}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span>{selectedStudent.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>Enrolled: {selectedStudent.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex gap-3">
              <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors">
                Edit Record
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}