export function PageLoader() {
  return (
    <div role="status" className="container-page grid min-h-[60vh] place-items-center">
      <span className="font-mono text-sm text-fg-muted">
        loading<span className="animate-pulse">…</span>
      </span>
    </div>
  );
}
