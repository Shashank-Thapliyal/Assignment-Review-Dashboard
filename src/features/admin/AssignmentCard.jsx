import { CalendarDays, Edit2, ExternalLink, Trash2 } from 'lucide-react'
import { formatDate, getCompletionRate } from '../../utils/assignmentUtils'

function AssignmentCard({ assignment, submissions, onEdit, onDelete }) {
  const completion = getCompletionRate(assignment, submissions)
  const assignedCount = assignment.assignedTo.length

  return (
    <article className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900">{assignment.title}</h3>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            {assignedCount} students
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-500">{assignment.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={14} />
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

      <div className="flex items-center gap-3 self-start sm:self-center">
        <div className="text-right">
          <div className="text-[11px] text-slate-400">Completion</div>
          <strong className="text-xs font-semibold text-slate-800">{completion}%</strong>
        </div>

        <button
          type="button"
          onClick={() => onEdit(assignment)}
          className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"
          title="Edit"
        >
          <Edit2 size={14} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(assignment)}
          className="rounded-lg border border-slate-200 p-1.5 text-rose-600 hover:bg-rose-50"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </article>
  )
}

export default AssignmentCard

