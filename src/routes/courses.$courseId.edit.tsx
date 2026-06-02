import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form'
import { courseResolver, type Course } from '../types/courses'
import { saveData, useDataQuery } from '../utilities/firebase'

export const Route = createFileRoute('/courses/$courseId/edit')({
  component: EditCourse,
})

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-red-500 text-sm mt-1">{message}</p>
}

function EditCourse() {
  const { courseId } = Route.useParams()
  const [courseData, loading, error] = useDataQuery(`courses/${courseId}`)

  if (loading) return <p>Loading course...</p>
  if (error) return <p>Error loading course: {error.message}</p>
  if (!courseData) return <p>Course not found.</p>

  return <EditCourseForm courseId={courseId} course={courseData as Course} />
}

function EditCourseForm({ courseId, course }: { courseId: string; course: Course }) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<Course>({
    defaultValues: course,
    mode: 'onChange',
    resolver: courseResolver,
  })

  const onSubmit: SubmitHandler<Course> = async data => {
    if (isDirty) await saveData(`courses/${courseId}`, data)
    navigate({ to: '/' })
  }

  const onError: SubmitErrorHandler<Course> = () => {
    alert('Fix errors before submitting')
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FieldError message={errors.title?.message} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="term">
            Term
          </label>
          <input
            id="term"
            type="text"
            {...register('term')}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FieldError message={errors.term?.message} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="number">
            Number
          </label>
          <input
            id="number"
            type="text"
            {...register('number')}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FieldError message={errors.number?.message} />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="meets">
            Meeting Times
          </label>
          <input
            id="meets"
            type="text"
            {...register('meets')}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FieldError message={errors.meets?.message} />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-medium disabled:opacity-50"
          >
            Save
          </button>
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
