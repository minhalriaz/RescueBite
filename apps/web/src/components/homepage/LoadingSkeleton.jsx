export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm animate-pulse"
        >
          <div className="h-44 rounded-2xl bg-[color:var(--color-rescue-accent-soft)]" />
          <div className="mt-4 h-3 w-2/4 rounded bg-[color:var(--color-rescue-accent-soft)]" />
          <div className="mt-2 h-4 w-3/4 rounded bg-[color:var(--color-rescue-accent-soft)]" />
          <div className="mt-5 space-y-2.5">
            <div className="h-3 w-full rounded bg-[color:var(--color-rescue-accent-soft)]" />
            <div className="h-3 w-5/6 rounded bg-[color:var(--color-rescue-accent-soft)]" />
            <div className="h-3 w-4/6 rounded bg-[color:var(--color-rescue-accent-soft)]" />
          </div>
          <div className="mt-5 h-11 rounded-xl bg-[color:var(--color-rescue-accent-soft)]" />
        </div>
      ))}
    </div>
  );
}