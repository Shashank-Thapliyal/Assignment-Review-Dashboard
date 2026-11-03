export function getAssignmentsForStudent(assignments, studentId) {
  return assignments.filter((assignment) => assignment.assignedTo.includes(studentId))
}

export function getAssignmentsForAdmin(assignments, adminId) {
  return assignments.filter((assignment) => assignment.createdBy === adminId)
}

export function getSubmission(submissions, assignmentId, studentId) {
  return submissions.find(
    (submission) => submission.assignmentId === assignmentId && submission.studentId === studentId,
  )
}

export function isOverdue(dueDate, isSubmitted) {
  return !isSubmitted && dueDate < new Date().toISOString().split('T')[0]
}

export function formatDate(dateString) {
  if (!dateString) return '—'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${dateString.split('T')[0]}T00:00:00`),
  )
}

export function formatDateTime(dateString) {
  if (!dateString) return '—'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function getCompletionRate(assignment, submissions) {
  if (!assignment.assignedTo.length) return 0
  const count = assignment.assignedTo.filter((sId) => getSubmission(submissions, assignment.id, sId)).length
  return Math.round((count / assignment.assignedTo.length) * 100)
}

export function getProfessorName(adminId) {
  return adminId === 'admin-2' ? 'Professor 2' : 'Professor 1'
}
