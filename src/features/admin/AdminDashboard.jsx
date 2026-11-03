import { BarChart3, CalendarDays, ClipboardList, GraduationCap } from 'lucide-react'
import EmptyWorkspace from '../../components/common/EmptyWorkspace'
import SummaryCard from '../../components/common/SummaryCard'

const summaryCards = [
  { label: 'Active assignments', icon: ClipboardList },
  { label: 'Assigned students', icon: GraduationCap },
  { label: 'Pending reviews', icon: BarChart3 },
  { label: 'Upcoming deadlines', icon: CalendarDays },
]

function AdminDashboard() {
  return (
    <main className="mx-auto w-[calc(100%-80px)] max-w-[1152px] py-10 max-lg:w-[calc(100%-48px)] max-lg:py-7 max-sm:w-[calc(100%-32px)]">
      <div className="mb-7">
        <p className="mb-1.5 text-[13px] font-semibold text-indigo-600">Professor workspace</p>
        <h1 className="m-0 text-3xl font-semibold tracking-[-0.03em] text-slate-900 max-sm:text-[26px]">Overview</h1>
        <p className="mt-2 text-sm text-slate-500">Keep assignments, reviews, and class progress organized in one place.</p>
      </div>
      <section className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:gap-2.5" aria-label="Professor workspace summary">
        {summaryCards.map((card) => <SummaryCard key={card.label} {...card} />)}
      </section>
      <EmptyWorkspace />
    </main>
  )
}

export default AdminDashboard
