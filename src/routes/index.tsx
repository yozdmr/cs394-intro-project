import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import TermPage from '../components/TermPage'
import type { CourseListProps } from '../components/CourseList'

export const Route = createFileRoute('/')({
  component: Index,
})

type ScheduleData = {
  title: string
  courses: CourseListProps['courses']
}

function Index() {
  const [data, setData] = useState<ScheduleData | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
    let isMounted = true

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error ${response.status}`)
        const json = await response.json()
        if (isMounted) setData(json)
      } catch (err) {
        if (isMounted) setError(err as Error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <p>Loading data...</p>
  if (error) return <p>Error loading data: {error.message}</p>

  return (
    <>
      <Banner title={data?.title ?? ''} />
      <TermPage courses={data?.courses ?? {}} />
    </>
  )
}
