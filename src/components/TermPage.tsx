import { useState } from 'react';
import CourseList, { type CourseListProps } from './CourseList';
import TermSelector, { type Term } from './TermSelector';

interface TermPageProps {
  courses: CourseListProps['courses'];
}

const TermPage = ({ courses }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>('Fall');
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList
        courses={courses}
        selectedTerm={selectedTerm}
        selectedCourses={selectedCourses}
        toggleCourse={toggleCourse}
      />
    </>
  );
};

export default TermPage;
