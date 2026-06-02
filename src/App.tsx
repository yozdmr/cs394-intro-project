import TermPage from './components/TermPage';
import type { CourseListProps } from './components/CourseList';
import { useDataQuery, useAuthState } from './utilities/firebase';

type ScheduleData = {
  title: string;
  courses: CourseListProps['courses'];
};

const App = () => {
  const [data, loading, error] = useDataQuery('/');
  const { isAuthenticated } = useAuthState();

  return (
    loading ? <p>Loading data...</p> :
    error ? <p>Error loading data: {error.message}</p> :
    <>
      <h1 className="text-2xl font-bold px-4 pt-4">{(data as ScheduleData).title}</h1>
      <TermPage courses={(data as ScheduleData).courses} isAuthenticated={isAuthenticated} />
    </>
  );
};

export default App;
