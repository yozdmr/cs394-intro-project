import Banner from './components/Banner';
import TermPage from './components/TermPage';
import type { CourseListProps } from './components/CourseList';
import { useDataQuery } from './utilities/firebase';

type ScheduleData = {
  title: string;
  courses: CourseListProps['courses'];
};

const App = () => {
  const [data, loading, error] = useDataQuery('/');

  return (
    loading ? <p>Loading data...</p> :
    error ? <p>Error loading data: {error.message}</p> :
    <>
      <Banner title={(data as ScheduleData).title} />
      <TermPage courses={(data as ScheduleData).courses} />
    </>
  );
};

export default App;
