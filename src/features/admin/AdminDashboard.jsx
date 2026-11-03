import { useState } from 'react'
import { BarChart3, CalendarDays, ClipboardList, GraduationCap, Plus } from 'lucide-react'
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

  const professorAssignments = getAssignmentsForAdmin(assignments, user.id)
  const assignedStudents = new Set(professorAssignments.flatMap((a) => a.assignedTo)).size
  const totalSubmissions = submissions.filter((s) => professorAssignments.some((a) => a.id === s.assignmentId)).length
  const totalAllocations = professorAssignments.reduce((sum, a) => sum + a.assignedTo.length, 0)
  const completionRate = totalAllocations ? `${Math.round((totalSubmissions / totalAllocations) * 100)}%` : '0%'

  const cards = [
    { label: 'Active assignments', icon: ClipboardList, value: professorAssignments.length },
    { label: 'Enrolled students', icon: GraduationCap, value: assignedStudents },
    { label: 'Submissions received', icon: CalendarDays, value: totalSubmissions },
    { label: 'Completion rate', icon: BarChart3, value: completionRate },
  ]

  function handleSave(data) {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, data)
    } else {
      createAssignment({ ...data, createdBy: user.id })
    }
  }

  return (
    <main className="mx-auto w-[calc(100%-80px)] max-w-[1152px] py-10 max-lg:w-[calc(100%-48px)] max-lg:py-7 max-sm:w-[calc(100%-32px)]">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{user.name} Workspace</h1>
          <p className="mt-1 text-sm text-slate-500">{user.department} • Professor Portal</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingAssignment(null)
            setModalOpen(true)
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
        >
          <Plus size={16} />
          Create Assignment
        </button>
      </div>

      {/* Summary Metrics */}
      <section className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:gap-2.5" aria-label="Professor summary">
        {cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </section>

      {/* Assignment List */}
      <section className="mt-8 space-y-4" aria-label="My created assignments">
        <h2 className="text-base font-semibold text-slate-900">Manage Course Assignments</h2>
        {professorAssignments.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            No assignments created yet. Click "Create Assignment" to add one.
          </div>
        ) : (
          professorAssignments.map((assignment) => (
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
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900">Delete Assignment</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-800">"{deletingAssignment.title}"</strong>? This will remove related student submissions.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingAssignment(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
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
