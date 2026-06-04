type ProgressBarProps = {
  packedCount: number;
  totalCount: number;
};

export function ProgressBar({ packedCount, totalCount }: ProgressBarProps) {
  const percent = totalCount === 0 ? 0 : Math.round((packedCount / totalCount) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-950">Packing progress</p>
          <p className="text-xs text-slate-500">{packedCount} of {totalCount} items packed</p>
        </div>
        <p className="text-2xl font-black text-slate-950">{percent}%</p>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-950 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
