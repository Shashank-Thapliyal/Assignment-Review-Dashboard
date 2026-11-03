import { useEffect, useState } from 'react'
import { seedAssignments, seedSubmissions } from '../data/seedAssignments'
import { AssignmentContext } from './assignmentContext'

const ASSIGNMENTS_KEY = 'ard_assignments'
const SUBMISSIONS_KEY = 'ard_submissions'

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(fallback))
      return fallback
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }
}

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useState(() => readStorage(ASSIGNMENTS_KEY, seedAssignments))
  const [submissions, setSubmissions] = useState(() => readStorage(SUBMISSIONS_KEY, seedSubmissions))

  useEffect(() => {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments))
  }, [assignments])

  useEffect(() => {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions))
  }, [submissions])

  function addSubmission(submission) {
    setSubmissions((current) => {
      if (current.some((item) => item.assignmentId === submission.assignmentId && item.studentId === submission.studentId)) {
        return current
      }

      return [...current, submission]
    })
  }

  return (
    <AssignmentContext.Provider value={{ assignments, submissions, setAssignments, setSubmissions, addSubmission }}>
      {children}
    </AssignmentContext.Provider>
  )
}
