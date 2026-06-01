import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

interface Course {
  term: string
  number: string
  meets: string
  title: string
}

const fetchCourse = async (courseId: string): Promise<Course> => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP error ${response.status}`)
  const json = await response.json()
  const course = json.courses[courseId]
  if (!course) throw new Error(`Course ${courseId} not found`)
  return course
}

export const Route = createFileRoute('/courses/$courseId/edit')({
  loader: ({ params }) => fetchCourse(params.courseId),
  component: EditCourse,
})

function EditCourse() {
  const course = Route.useLoaderData()
  const [title, setTitle] = useState(course.title)
  const [meets, setMeets] = useState(course.meets)

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
      <form onSubmit={e => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="meets">
            Meeting Times
          </label>
          <input
            id="meets"
            type="text"
            value={meets}
            onChange={e => setMeets(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-3">
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
