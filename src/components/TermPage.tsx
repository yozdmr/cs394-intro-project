import { useState } from 'react';
import CourseList, { type CourseListProps } from './CourseList';
import TermSelector, { type Term } from './TermSelector';

interface TermPageProps {
  courses: CourseListProps['courses'];
}

const TermPage = ({ courses }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>('Fall');

  return (
    <>
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList courses={courses} selectedTerm={selectedTerm} />
    </>
  );
};

export default TermPage;
