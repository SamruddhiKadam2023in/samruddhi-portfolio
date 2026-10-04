import type { Decision } from '../../../types/project';

const rows: Array<{ key: keyof Decision; label: string }> = [
  { key: 'context', label: 'Context' },
  { key: 'decision', label: 'Decision' },
  { key: 'reason', label: 'Reason' },
  { key: 'tradeoff', label: 'Trade-off' },
];

/** Each decision reads Context → Decision → Reason → Trade-off. */
export function DecisionList({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="space-y-4">
      {decisions.map((decision, index) => (
        <li
          key={decision.decision}
          className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
        >
          <p className="font-mono text-xs text-accent">
            decision {String(index + 1).padStart(2, '0')}
          </p>
          <dl className="mt-4 space-y-3">
            {rows.map((row) => (
              <div key={row.key} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                <dt className="font-mono text-xs text-fg-muted sm:pt-0.5">{row.label}</dt>
                <dd
                  className={
                    row.key === 'decision'
                      ? 'leading-relaxed font-medium'
                      : 'text-sm leading-relaxed text-fg-secondary'
                  }
                >
                  {decision[row.key]}
                </dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}
