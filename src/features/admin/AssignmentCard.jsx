import { useState } from 'react'
import { CalendarDays, ChevronDown, ChevronUp, Edit2, ExternalLink, Trash2, Users } from 'lucide-react'
import { formatDate, formatDateTime, getCompletionRate, getSubmission, isOverdue } from '../../utils/assignmentUtils'
import { getUsersByRole } from '../../data/seedData'

const ALL_STUDENTS = getUsersByRole('student')

function AssignmentCard({ assignment, submissions, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const completion = getCompletionRate(assignment, submissions)
  const assignedCount = assignment.assignedTo.length
  const submittedCount = assignment.assignedTo.filter((sId) => getSubmission(submissions, assignment.id, sId)).length

  return (
    <article className="rounded-xl border border-slate-200 bg-white shadow-2xs transition">
      <div className="flex flex-col justify-between gap-3.5 p-4 sm:p-5 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">{assignment.title}</h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {assignedCount} students
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">{assignment.description}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CalendarDays size={13} />
              Due {formatDate(assignment.dueDate)}
            </span>
            {assignment.driveLink && (
              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
              >
                <ExternalLink size={13} />
                Drive Folder
              </a>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-3 pt-2.5 border-t border-slate-100 sm:w-auto sm:border-0 sm:pt-0 sm:self-center">
          <div className="text-left sm:text-right">
            <div className="text-[11px] text-slate-400">Class Progress</div>
            <strong className="text-xs font-semibold text-slate-800">{submittedCount}/{assignedCount} ({completion}%)</strong>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              title="Student list"
            >
              <Users size={13} />
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            <button
              type="button"
              onClick={() => onEdit(assignment)}
              className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"
              title="Edit"
            >
              <Edit2 size={13} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(assignment)}
              className="rounded-lg border border-slate-200 p-1.5 text-rose-600 hover:bg-rose-50"
              title="Delete"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/60 p-3 sm:p-4">
          <h4 className="mb-2 text-xs font-semibold text-slate-700">Student Submission Status</h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full min-w-[440px] text-left text-xs">
              <thead className="border-b bg-slate-50 text-[11px] font-semibold text-slate-500">
                <tr>
                  <th className="px-3 py-2">Student</th>
                  <th className="px-3 py-2">Roll No</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Submitted On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {assignment.assignedTo.map((studentId) => {
                  const student = ALL_STUDENTS.find((s) => s.id === studentId) || { name: studentId, rollNumber: '—', email: '—' }
                  const sub = getSubmission(submissions, assignment.id, studentId)
                  const isSub = !!sub
                  const isOver = isOverdue(assignment.dueDate, isSub)

                  return (
                    <tr key={studentId} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-medium">{student.name}</td>
                      <td className="px-3 py-2 font-mono text-slate-500">{student.rollNumber}</td>
                      <td className="px-3 py-2 text-slate-400">{student.email}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            isSub
                              ? 'bg-emerald-50 text-emerald-700'
                              : isOver
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {isSub ? 'Submitted' : isOver ? 'Overdue' : 'Not Submitted'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-slate-500">
                        {isSub && sub.submittedAt ? formatDateTime(sub.submittedAt) : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </article>
  )
}

export default AssignmentCard
