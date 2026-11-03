import { BookOpenCheck, ClipboardList, Clock3, CircleCheck } from 'lucide-react'
import EmptyWorkspace from '../../components/common/EmptyWorkspace'
import SummaryCard from '../../components/common/SummaryCard'
import { useAuth } from '../../hooks/useAuth'
import { useAssignments } from '../../hooks/useAssignments'
import { getAssignmentsForStudent, getSubmission } from '../../utils/assignmentUtils'

const summaryCards = [
  { label: 'My assignments', icon: ClipboardList },
  { label: 'Submitted', icon: CircleCheck },
  { label: 'Pending', icon: Clock3 },
  { label: 'Overall progress', icon: BookOpenCheck },
]

function StudentDashboard() {
  const { user } = useAuth()
  const { assignments, submissions } = useAssignments()
  const studentAssignments = getAssignmentsForStudent(assignments, user.id)
  const submittedCount = studentAssignments.filter((assignment) =>
    getSubmission(submissions, assignment.id, user.id),
  ).length
  const pendingCount = studentAssignments.length - submittedCount
  const progressRate = studentAssignments.length
    ? `${Math.round((submittedCount / studentAssignments.length) * 100)}%`
    : '0%'

  const cardValues = [studentAssignments.length, submittedCount, pendingCount, progressRate]

  return (
    <main className="mx-auto w-[calc(100%-80px)] max-w-[1152px] py-10 max-lg:w-[calc(100%-48px)] max-lg:py-7 max-sm:w-[calc(100%-32px)]">
      <div className="mb-7">
        <p className="mb-1.5 text-[13px] font-semibold text-indigo-600">Student workspace</p>
        <h1 className="m-0 text-3xl font-semibold tracking-[-0.03em] text-slate-900 max-sm:text-[26px]">Overview</h1>
        <p className="mt-2 text-sm text-slate-500">Stay on top of assignments and track your academic progress.</p>
      </div>
      <section className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:gap-2.5" aria-label="Student workspace summary">
        {summaryCards.map((card, index) => (
          <SummaryCard key={card.label} {...card} value={cardValues[index]} />
        ))}
      </section>
      <EmptyWorkspace />
    </main>
  )
}

export default StudentDashboard
