import { useState } from 'react';
import CourseList, { type CourseListProps } from './CourseList';
import TermSelector, { type Term } from './TermSelector';

interface TermPageProps {
  courses: CourseListProps['courses'];
  isAuthenticated: boolean;
}

const CoursePlanModal = ({ courses, selectedCourses, onClose }: {
  courses: CourseListProps['courses'];
  selectedCourses: Set<string>;
  onClose: () => void;
}) => {
  const selected = [...selectedCourses].map(id => courses[id]).filter(Boolean);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Course Plan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {selected.length === 0 ? (
          <div className="text-gray-600">
            <p className="mb-2">No courses selected yet.</p>
            <p className="text-sm">Click any course card to add it to your plan. Selected courses are highlighted.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {selected.map(course => (
              <li key={`${course.term}-${course.number}`} className="py-3">
                <p className="font-semibold">{course.term} CS {course.number}: {course.title}</p>
                <p className="text-sm text-gray-500">{course.meets}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const TermPage = ({ courses, isAuthenticated }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>('Fall');
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [showPlan, setShowPlan] = useState(false);

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
        <button
          onClick={() => setShowPlan(true)}
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 font-medium whitespace-nowrap"
        >
          Course Plan {selectedCourses.size > 0 && `(${selectedCourses.size})`}
        </button>
      </div>
      <CourseList
        courses={courses}
        selectedTerm={selectedTerm}
        selectedCourses={selectedCourses}
        toggleCourse={toggleCourse}
        isAuthenticated={isAuthenticated}
      />
      {showPlan && (
        <CoursePlanModal
          courses={courses}
          selectedCourses={selectedCourses}
          onClose={() => setShowPlan(false)}
        />
      )}
    </>
  );
};

export default TermPage;
