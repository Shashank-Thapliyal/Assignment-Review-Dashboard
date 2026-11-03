function SummaryCard({ label, icon: Icon, value, description }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-2xs transition hover:border-slate-300">
      <div className="flex items-center justify-between gap-2 text-slate-500">
        <p className="m-0 truncate text-xs sm:text-[13px] font-medium text-slate-500">{label}</p>
        <span className="grid size-7 sm:size-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
          <Icon size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <strong className="mt-2.5 sm:mt-3 block text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{value}</strong>
      {description && <p className="mt-1 truncate text-[11px] text-slate-400">{description}</p>}
    </article>
  )
}

export default SummaryCard
