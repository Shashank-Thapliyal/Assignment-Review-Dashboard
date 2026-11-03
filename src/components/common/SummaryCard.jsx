function SummaryCard({ label, icon: Icon, value }) {
  return (
    <article className="rounded-[11px] border border-slate-200 bg-white p-5 shadow-sm max-sm:p-[15px]">
      <div className="flex items-center justify-between gap-3 text-indigo-600">
        <p className="m-0 text-[13px] text-slate-500 max-sm:text-xs">{label}</p>
        <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <strong className="mt-4 block text-[27px] font-semibold">{value}</strong>
    </article>
  )
}

export default SummaryCard
