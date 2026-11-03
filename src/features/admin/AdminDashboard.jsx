import { useState, useMemo } from 'react'
import { BarChart3, CalendarDays, ClipboardList, GraduationCap, Plus, Search } from 'lucide-react'
import SummaryCard from '../../components/common/SummaryCard'
import AssignmentCard from './AssignmentCard'
import AssignmentModal from './AssignmentModal'
import { useAuth } from '../../hooks/useAuth'
import { useAssignments } from '../../hooks/useAssignments'
import { getAssignmentsForAdmin } from '../../utils/assignmentUtils'

function AdminDashboard() {
  const { user } = useAuth()
  const { assignments, submissions, createAssignment, updateAssignment, deleteAssignment } = useAssignments()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [deletingAssignment, setDeletingAssignment] = useState(null)
  const [search, setSearch] = useState('')

  const professorAssignments = useMemo(() => getAssignmentsForAdmin(assignments, user.id), [assignments, user.id])
  const assignedStudents = new Set(professorAssignments.flatMap((a) => a.assignedTo)).size
  const totalSubmissions = submissions.filter((s) => professorAssignments.some((a) => a.id === s.assignmentId)).length
  const totalAllocations = professorAssignments.reduce((sum, a) => sum + a.assignedTo.length, 0)
  const completionRate = totalAllocations ? `${Math.round((totalSubmissions / totalAllocations) * 100)}%` : '0%'

  const displayedAssignments = useMemo(() => {
    return professorAssignments.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()),
    )
  }, [professorAssignments, search])

  const cards = [
    { label: 'Active assignments', icon: ClipboardList, value: professorAssignments.length },
    { label: 'Enrolled students', icon: GraduationCap, value: assignedStudents },
    { label: 'Submissions received', icon: CalendarDays, value: totalSubmissions },
    { label: 'Class completion', icon: BarChart3, value: completionRate },
  ]

  function handleSave(data) {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, data)
    } else {
      createAssignment({ ...data, createdBy: user.id })
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.name} Workspace</h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500">{user.department}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingAssignment(null)
            setModalOpen(true)
          }}
          className="inline-flex self-start sm:self-center items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-indigo-700"
        >
          <Plus size={15} />
          Create Assignment
        </button>
      </div>

      {/* Metrics */}
      <section className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4" aria-label="Professor summary">
        {cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </section>

      {/* Search */}
      <div className="mt-6 flex items-center rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 outline-none focus:border-indigo-400 focus:bg-white"
          />
        </div>
      </div>

      {/* Assignment List */}
      <section className="mt-5 space-y-3" aria-label="Created assignments">
        {displayedAssignments.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
            {professorAssignments.length === 0 ? 'No assignments created yet.' : 'No assignments match your search.'}
          </div>
        ) : (
          displayedAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              submissions={submissions}
              onEdit={(item) => {
                setEditingAssignment(item)
                setModalOpen(true)
              }}
              onDelete={(item) => setDeletingAssignment(item)}
            />
          ))
        )}
      </section>

      {/* Create / Edit Modal */}
      <AssignmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingAssignment}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      {deletingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900">Delete Assignment</h3>
            <p className="mt-2 text-xs text-slate-500">
              Are you sure you want to delete <strong className="text-slate-800">"{deletingAssignment.title}"</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingAssignment(null)}
                className="rounded-lg border px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteAssignment(deletingAssignment.id)
                  setDeletingAssignment(null)
                }}
                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default AdminDashboard
