/** Route-level loading skeleton while the practice series generates
 * server-side — avoids a blank moment between navigation and the first
 * question appearing. */
export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse px-4 py-8">
      <div className="h-7 w-2/3 rounded bg-border" />
      <div className="mt-6 h-1.5 w-full rounded-full bg-border" />
      <div className="mt-8 h-24 w-full rounded bg-border" />
      <div className="mt-6 h-10 w-full rounded bg-border" />
    </div>
  );
}
