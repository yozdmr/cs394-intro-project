import { createFileRoute } from '@tanstack/react-router'
import TermPage from '../components/TermPage'
import type { CourseListProps } from '../components/CourseList'
import { useAuthState, useAdminStatus, useDataQuery } from '../utilities/firebase'

type ScheduleData = {
  title: string
  courses: CourseListProps['courses']
}

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [data, loading, error] = useDataQuery('/')
  const { user } = useAuthState()
  const isAdmin = useAdminStatus(user?.uid)

  if (loading) return <p>Loading data...</p>
  if (error) return <p>Error loading data: {error.message}</p>

  const scheduleData = data as ScheduleData

  return (
    <>
      <h1 className="text-2xl font-bold px-4 pt-4">{scheduleData?.title ?? ''}</h1>
      <TermPage courses={scheduleData?.courses ?? {}} isAdmin={isAdmin} />
    </>
  )
}
