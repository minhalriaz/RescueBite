const styles = {
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20",
  Approved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20",
  Rejected: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20",
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20",
  Inactive: "bg-slate-500/10 text-slate-500 dark:text-slate-300 border-slate-500/20",
  Available: "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20",
  Rescued: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20",
  Completed: "bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20",
  Open: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20",
  Reviewing: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${styles[status] || "bg-slate-500/10 text-slate-500 border-slate-500/20"}`}>
      {status}
    </span>
  );
}
