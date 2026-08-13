'use client';

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { StudentStats } from './_components/StudentStats';
import { StudentFilters } from './_components/StudentFilters';
import { StudentTable, Student } from './_components/StudentTable';

const mockStudents: Student[] = [
  {
    id: 'STD-1092',
    name: 'Alexander Wright',
    email: 'a.wright@schoolos.edu',
    grade: 'Grade 11',
    status: 'Active',
    gpa: '3.82',
    attendance: '96%',
    guardian: 'Eleanor Wright',
    phone: '+1 (555) 019-2831',
    joinedDate: 'Aug 2024',
  },
  {
    id: 'STD-1093',
    name: 'Sophia Chen',
    email: 's.chen@schoolos.edu',
    grade: 'Grade 10',
    status: 'Active',
    gpa: '3.95',
    attendance: '99%',
    guardian: 'David Chen',
    phone: '+1 (555) 014-8820',
    joinedDate: 'Aug 2025',
  },
  {
    id: 'STD-1094',
    name: 'Liam Martinez',
    email: 'l.martinez@schoolos.edu',
    grade: 'Grade 12',
    status: 'At Risk',
    gpa: '2.40',
    attendance: '81%',
    guardian: 'Maria Martinez',
    phone: '+1 (555) 017-3391',
    joinedDate: 'Aug 2023',
  },
  {
    id: 'STD-1095',
    name: 'Emma Watson',
    email: 'e.watson@schoolos.edu',
    grade: 'Grade 9',
    status: 'Active',
    gpa: '3.68',
    attendance: '94%',
    guardian: 'Robert Watson',
    phone: '+1 (555) 012-9943',
    joinedDate: 'Aug 2026',
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;

    return matchesSearch && matchesGrade && matchesStatus;
  });

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

      {/* KPI Overview */}
      <StudentStats />

      {/* Filter and Search Controls */}
      <StudentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onAddStudent={() => alert('Open Add Student Modal')}
      />

      {/* Student List Table */}
      <StudentTable students={filteredStudents} />
    </div>
  );
}