import { useState } from 'react';
import type { Term } from './TermSelector';


const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);


interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export interface CourseListProps {
  courses: Record<string, Course>;
  selectedTerm: Term;
}

const CourseList = ({ courses, selectedTerm }: CourseListProps) => {

  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const toggleCourses = (item: Course) => {
    setSelectedCourses(selectedCourses => toggleList(item, selectedCourses));
  };
  
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
      {Object.entries(courses).filter(([, course]) => course.term === selectedTerm).map(([id, course]) => (
        <div key={id} className={`course-card${selectedCourses.includes(course) ? ' selected' : ''}`} onClick={() => toggleCourses(course)}>
          <div>
            <h2 className="font-bold text-lg mb-2">{course.term} CS {course.number}</h2>
            <p className="text-gray-600">{course.title}</p>
          </div>
          <div>
            <hr className="my-3 border-gray-200" />
            <p className="text-gray-500 text-sm">{course.meets}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default CourseList;
