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

export function getCompletionRate(assignment, submissions) {
  if (!assignment.assignedTo.length) {
    return 0
  }

  const submittedCount = assignment.assignedTo.filter((studentId) =>
    getSubmission(submissions, assignment.id, studentId),
  ).length

  return Math.round((submittedCount / assignment.assignedTo.length) * 100)
}
