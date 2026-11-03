import { useState } from 'react'
import { AlertTriangle, BookOpenCheck, CalendarDays, CheckCircle, Clock3, ExternalLink, GraduationCap, X } from 'lucide-react'
import SummaryCard from '../../components/common/SummaryCard'
import { useAuth } from '../../hooks/useAuth'
import { useAssignments } from '../../hooks/useAssignments'
import { getAssignmentsForStudent, getSubmission, isOverdue, formatDate, getProfessorName } from '../../utils/assignmentUtils'

function StudentDashboard() {
  const { user } = useAuth()
  const { assignments, submissions, submitAssignment } = useAssignments()
  const [confirmingId, setConfirmingId] = useState(null)
  const [toast, setToast] = useState('')

  const studentAssignments = getAssignmentsForStudent(assignments, user.id)
  const submittedCount = studentAssignments.filter((a) => getSubmission(submissions, a.id, user.id)).length
  const overdueCount = studentAssignments.filter((a) => isOverdue(a.dueDate, !!getSubmission(submissions, a.id, user.id))).length
  const pendingCount = studentAssignments.length - submittedCount
  const progressRate = studentAssignments.length ? `${Math.round((submittedCount / studentAssignments.length) * 100)}%` : '0%'

  const cards = [
    { label: 'My assignments', icon: BookOpenCheck, value: studentAssignments.length },
    { label: 'Submitted', icon: CheckCircle, value: submittedCount },
    { label: 'Pending', icon: Clock3, value: pendingCount },
    { label: 'Overdue', icon: AlertTriangle, value: overdueCount },
  ]

  const activeAssignment = studentAssignments.find((a) => a.id === confirmingId)

  return (
    <main className="mx-auto w-[calc(100%-80px)] max-w-[1152px] py-10 max-lg:w-[calc(100%-48px)] max-lg:py-7 max-sm:w-[calc(100%-32px)]">
      {toast && (
        <div className="mb-5 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-800">
          <span>{toast}</span>
          <button type="button" onClick={() => setToast('')}><X size={14} /></button>
        </div>
      )}

      {/* Student Profile Header */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome, {user.name}</h1>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">{user.rollNumber}</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{user.department} • NIT Warangal</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-xs">
          <span className="text-xs text-slate-500">Overall Progress: </span>
          <strong className="text-sm font-bold text-indigo-600">{progressRate}</strong>
        </div>
      </div>

      {/* Summary Metrics */}
      <section className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:gap-2.5" aria-label="Student summary">
        {cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </section>

      {/* Allocated Assignment Cards */}
      <section className="mt-8 space-y-4" aria-label="My allocated assignments">
        <h2 className="text-base font-semibold text-slate-900">Allocated Assignments</h2>
        {studentAssignments.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            No assignments currently allocated.
          </div>
        ) : (
          studentAssignments.map((assignment) => {
            const submission = getSubmission(submissions, assignment.id, user.id)
            const isSub = !!submission
            const isOver = isOverdue(assignment.dueDate, isSub)

            return (
              <article
                key={assignment.id}
                className={`flex flex-col justify-between gap-4 rounded-xl border bg-white p-5 shadow-xs transition sm:flex-row sm:items-center ${
                  isOver ? 'border-rose-200 bg-rose-50/15' : 'border-slate-200'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{assignment.title}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        isSub
                          ? 'bg-emerald-50 text-emerald-700'
                          : isOver
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {isSub ? 'Submitted' : isOver ? 'Overdue' : 'Pending'}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">{assignment.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <GraduationCap size={14} className="text-indigo-600" />
                      {getProfessorName(assignment.createdBy)}
                    </span>
                    <span className={`flex items-center gap-1 ${isOver ? 'font-semibold text-rose-600' : ''}`}>
                      <CalendarDays size={14} />
                      Due {formatDate(assignment.dueDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  {assignment.driveLink && (
                    <a
                      href={assignment.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <ExternalLink size={13} className="text-indigo-600" />
                      Drive Link
                    </a>
                  )}

                  {isSub ? (
                    <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      ✓ Submitted
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingId(assignment.id)}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
                    >
                      Yes, I have submitted
                    </button>
                  )}
                </div>
              </article>
            )
          })
        )}
      </section>

      {/* 2-Step Submission Confirmation Dialog */}
      {confirmingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900">Confirm Submission</h3>
            <p className="mt-1 text-xs font-medium text-indigo-600">{activeAssignment?.title}</p>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              This action confirms that you have uploaded your work to the Google Drive folder. ARD does not host or verify files directly.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmingId(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  submitAssignment(confirmingId, user.id)
                  setConfirmingId(null)
                  setToast('Submission confirmed successfully!')
                  setTimeout(() => setToast(''), 3000)
                }}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default StudentDashboard
