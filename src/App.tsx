import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import CourseList, { type CourseListProps } from './components/CourseList';

interface ScheduleData {
  title: string;
  courses: CourseListProps['courses'];
}

const App = () => {
  const [data, setData] = useState<ScheduleData | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const json = await response.json();
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  return (
    loading ? <p>Loading data...</p> :
    error ? <p>Error loading data: {error.message}</p> :
    <>
      <Banner title={data?.title ?? ''} />
      <CourseList courses={data?.courses ?? {}} />
    </>
  );
};

export default App;
