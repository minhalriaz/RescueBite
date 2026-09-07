export default function AdminTable({ headers, children, empty = "No records found." }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="border-b border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-bg)]">
            <tr>{headers.map((h) => <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-[color:var(--color-rescue-text-muted)]">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--color-rescue-border)]">
            {children || <tr><td colSpan={headers.length} className="px-5 py-12 text-center text-sm text-[color:var(--color-rescue-text-muted)]">{empty}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
