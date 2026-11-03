import { BookOpenCheck } from 'lucide-react'

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-[38px] place-items-center rounded-[11px] bg-indigo-600 text-white">
        <BookOpenCheck size={21} aria-hidden="true" />
      </div>
      <div>
        <p className="m-0 text-[11px] font-extrabold tracking-[0.2em] text-indigo-600">ARD</p>
        <p className="mt-px whitespace-nowrap text-[13px] font-semibold">Assignment &amp; Review</p>
      </div>
    </div>
  )
}

export default Brand
