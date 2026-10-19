'use client';

import { useState, useTransition } from 'react';
import { StudentFilters } from './StudentFilters';
import { StudentTable, Student } from './StudentTable';
import { AddStudentModal } from './AddStudentModal';
import { createStudent, StudentStats as StudentStatsType } from '../actions';

interface StudentsClientWrapperProps {
  initialStudents: Student[];
  stat?: StudentStatsType; // Optional stats prop for future use
}

export function StudentsClientWrapper({ initialStudents, stat }: StudentsClientWrapperProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAddStudent = async (formData: {
    name: string;
    email: string;
    grade: string;
    guardian: string;
    phone: string;
  }) => {
    startTransition(async () => {
      // Execute Server Action
      const res = await createStudent(formData);
      if (res.success && res.student) {
        setStudents((prev) => [res.student, ...prev]);
        setIsModalOpen(false);
      }
    });
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <StudentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onAddStudent={() => setIsModalOpen(true)}
      />

      <StudentTable students={filteredStudents} />

      <AddStudentModal
        isOpen={isModalOpen}
        isPending={isPending}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />
    </div>
  );
}