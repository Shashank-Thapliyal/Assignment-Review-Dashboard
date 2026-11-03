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

  function createAssignment(data) {
    const item = {
      ...data,
      id: `assignment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setAssignments((prev) => [item, ...prev])
  }

  function updateAssignment(id, data) {
    setAssignments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item)),
    )
    if (data.assignedTo) {
      setSubmissions((prev) =>
        prev.filter((sub) => sub.assignmentId !== id || data.assignedTo.includes(sub.studentId)),
      )
    }
  }

  function deleteAssignment(id) {
    setAssignments((prev) => prev.filter((item) => item.id !== id))
    setSubmissions((prev) => prev.filter((sub) => sub.assignmentId !== id))
  }

  function submitAssignment(assignmentId, studentId) {
    setSubmissions((current) => {
      if (current.some((item) => item.assignmentId === assignmentId && item.studentId === studentId)) {
        return current
      }
      return [
        ...current,
        {
          id: `submission-${Date.now()}`,
          assignmentId,
          studentId,
          status: 'submitted',
          submittedAt: new Date().toISOString(),
        },
      ]
    })
  }

  function resetDemoData() {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(seedAssignments))
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(seedSubmissions))
    setAssignments(seedAssignments)
    setSubmissions(seedSubmissions)
  }

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        submissions,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        submitAssignment,
        resetDemoData,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  )
}
