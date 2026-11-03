import { useState } from 'react'
import { X } from 'lucide-react'
import { getUsersByRole } from '../../data/seedData'

const ALL_STUDENTS = getUsersByRole('student')

function AssignmentModal({ isOpen, onClose, initialData, onSave }) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate || '',
    driveLink: initialData?.driveLink || '',
    assignedTo: initialData?.assignedTo || ALL_STUDENTS.map((s) => s.id),
  })
  const [error, setError] = useState('')

  if (!isOpen) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim() || !form.dueDate || !form.driveLink.trim()) {
      return setError('Please fill in all fields.')
    }
    if (!form.driveLink.startsWith('http://') && !form.driveLink.startsWith('https://')) {
      return setError('Drive link must start with http:// or https://')
    }
    if (!form.assignedTo.length) {
      return setError('Please allocate at least one student.')
    }
    onSave(form)
    onClose()
  }

  function toggleStudent(id) {
    setForm((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(id)
        ? prev.assignedTo.filter((sId) => sId !== id)
        : [...prev.assignedTo, id],
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900">{initialData ? 'Edit' : 'Create'} Assignment</h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {error && <p className="mt-2 rounded bg-rose-50 p-2 text-xs text-rose-600">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-3 space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-400"
              placeholder="e.g. Operating Systems — Process Scheduling"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700">Description</label>
            <textarea
              rows={2}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-400"
              placeholder="Brief instructions..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700">Due Date</label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700">Google Drive Link</label>
              <input
                type="url"
                required
                value={form.driveLink}
                onChange={(e) => setForm({ ...form, driveLink: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-400"
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Assign Students ({form.assignedTo.length})</span>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    assignedTo: form.assignedTo.length === ALL_STUDENTS.length ? [] : ALL_STUDENTS.map((s) => s.id),
                  })
                }
                className="text-indigo-600 hover:underline"
              >
                {form.assignedTo.length === ALL_STUDENTS.length ? 'Clear' : 'Select All'}
              </button>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {ALL_STUDENTS.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggleStudent(s.id)}
                  className={`rounded border px-2.5 py-1 font-medium transition ${
                    form.assignedTo.includes(s.id)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {s.name} ({s.rollNumber})
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2 border-t pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-1.5 font-semibold text-white hover:bg-indigo-700"
            >
              Save Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssignmentModal
