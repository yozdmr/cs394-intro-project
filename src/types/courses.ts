import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const meetingTimeRegex = /^(M|Tu|W|Th|F|Sa|Su)+ \d{1,2}:\d{2}-\d{1,2}:\d{2}$/

const Course = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters'),
  term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'] as const, {
    message: 'Term must be Fall, Winter, Spring, or Summer',
  }),
  number: z
    .string()
    .regex(/^\d+(-\d+)?$/, 'Must be a number with optional section, e.g., "213-2"'),
  meets: z
    .string()
    .refine(
      val => val === '' || meetingTimeRegex.test(val),
      'Must contain days and start-end, e.g., MWF 12:00-13:20',
    ),
})

export type Course = z.infer<typeof Course>
export const courseResolver = zodResolver(Course)
