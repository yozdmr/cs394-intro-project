import { Link } from '@tanstack/react-router';
import { hasConflict } from '../utilities/timeConflicts';
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

const CourseList = ({ courses, selectedTerm, selectedCourses, toggleCourse }: CourseListProps) => {
  const selectedMeetings = [...selectedCourses].map(id => courses[id]).filter(Boolean).map(c => ({ meets: c.meets, term: c.term }));

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
      {Object.entries(courses).filter(([, course]) => course.term === selectedTerm).map(([id, course]) => {
        const isSelected = selectedCourses.has(id);
        const conflicting = !isSelected && hasConflict(course.meets, course.term, selectedMeetings);

        return (
          <div
            key={id}
            onClick={() => !conflicting && toggleCourse(id)}
            className={`course-card${isSelected ? ' selected' : ''}${conflicting ? ' conflicting' : ''}`}
          >
            <div>
              <h2 className="font-bold text-lg mb-2">{course.term} CS {course.number}</h2>
              <p className="text-gray-600">{course.title}</p>
            </div>
            <div>
              <hr className="my-3 border-gray-200" />
              <p className="text-gray-500 text-sm">{course.meets}</p>
            </div>
            <Link
              to="/courses/$courseId/edit"
              params={{ courseId: id }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="mt-2 self-start text-xs text-purple-700 hover:underline"
            >
              Edit
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;
