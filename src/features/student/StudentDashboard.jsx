import { AlertTriangle, BookOpenCheck, CalendarDays, CheckCircle, Clock3, ExternalLink, GraduationCap } from 'lucide-react'
import SummaryCard from '../../components/common/SummaryCard'
import { useAuth } from '../../hooks/useAuth'
import { useAssignments } from '../../hooks/useAssignments'
import { getAssignmentsForStudent, getSubmission, isOverdue, formatDate, getProfessorName } from '../../utils/assignmentUtils'

function StudentDashboard() {
  const { user } = useAuth()
  const { assignments, submissions } = useAssignments()

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

  return (
    <main className="mx-auto w-[calc(100%-80px)] max-w-[1152px] py-10 max-lg:w-[calc(100%-48px)] max-lg:py-7 max-sm:w-[calc(100%-32px)]">
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

                {assignment.driveLink && (
                  <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:self-center"
                  >
                    <ExternalLink size={13} className="text-indigo-600" />
                    Drive Link
                  </a>
                )}
              </article>
            )
          })
        )}
      </section>
    </main>
  )
}

export default StudentDashboard
