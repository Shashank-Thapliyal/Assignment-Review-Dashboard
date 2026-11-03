import { BookOpenCheck } from 'lucide-react'

function EmptyWorkspace() {
  return (
    <section className="mt-5 flex min-h-[290px] flex-col items-center justify-center rounded-[11px] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mb-4 grid size-[58px] place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
        <BookOpenCheck size={28} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <h2 className="m-0 text-[17px] font-semibold">Your workspace at a glance</h2>
      <p className="mt-2 max-w-[390px] text-[13px] leading-relaxed text-slate-500">
        Assignment activity, submission progress, and class updates will appear here.
      </p>
    </section>
  )
}

export default EmptyWorkspace
