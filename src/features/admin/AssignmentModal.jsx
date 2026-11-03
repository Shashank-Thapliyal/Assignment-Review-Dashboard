import { useState } from 'react'
import { X } from 'lucide-react'
import { getUsersByRole } from '../../data/seedData'

const ALL_STUDENTS = getUsersByRole('student')

function AssignmentForm({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate || '',
    driveLink: initialData?.driveLink || '',
    assignedTo: initialData?.assignedTo || ALL_STUDENTS.map((s) => s.id),
  })
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim() || !formData.dueDate || !formData.driveLink.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!formData.driveLink.startsWith('http://') && !formData.driveLink.startsWith('https://')) {
      setError('Drive link must be a valid HTTP or HTTPS URL.')
      return
    }
    if (formData.assignedTo.length === 0) {
      setError('Please allocate at least one student.')
      return
    }

    onSave(formData)
    onClose()
  }

  function toggleStudent(id) {
    setFormData((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(id)
        ? prev.assignedTo.filter((sId) => sId !== id)
        : [...prev.assignedTo, id],
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-base font-bold text-slate-900">
            {initialData ? 'Edit Assignment' : 'Create Assignment'}
          </h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {error && <p className="mt-3 rounded-lg bg-rose-50 p-2 text-xs text-rose-700">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-400"
              placeholder="e.g. Operating Systems — Process Scheduling"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Description</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-400"
              placeholder="Brief instructions for students..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Due Date</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Google Drive Link</label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/..."
                value={formData.driveLink}
                onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Assign to Students ({formData.assignedTo.length})</span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    assignedTo: prev.assignedTo.length === ALL_STUDENTS.length ? [] : ALL_STUDENTS.map((s) => s.id),
                  }))
                }
                className="text-indigo-600 hover:underline"
              >
                {formData.assignedTo.length === ALL_STUDENTS.length ? 'Clear All' : 'Select All'}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {ALL_STUDENTS.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggleStudent(s.id)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                    formData.assignedTo.includes(s.id)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {s.name} ({s.rollNumber})
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
            >
              Save Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AssignmentModal({ isOpen, onClose, initialData, onSave }) {
  if (!isOpen) return null
  return <AssignmentForm key={initialData?.id || 'new'} initialData={initialData} onClose={onClose} onSave={onSave} />
}

export default AssignmentModal
