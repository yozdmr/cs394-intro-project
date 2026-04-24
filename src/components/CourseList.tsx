import type { Term } from './TermSelector';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export interface CourseListProps {
  courses: Record<string, Course>;
  selectedTerm: Term;
  selectedCourses: Set<string>;
  toggleCourse: (id: string) => void;
}

const CourseList = ({ courses, selectedTerm, selectedCourses, toggleCourse }: CourseListProps) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
    {Object.entries(courses).filter(([, course]) => course.term === selectedTerm).map(([id, course]) => {
      return (
        <div key={id} onClick={() => toggleCourse(id)} className={`course-card${selectedCourses.has(id) ? ' selected' : ''}`}>
          <div>
            <h2 className="font-bold text-lg mb-2">{course.term} CS {course.number}</h2>
            <p className="text-gray-600">{course.title}</p>
          </div>
          <div>
            <hr className="my-3 border-gray-200" />
            <p className="text-gray-500 text-sm">{course.meets}</p>
          </div>
        </div>
      );
    })}
  </div>
);

export default CourseList;
