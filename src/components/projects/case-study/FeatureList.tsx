import type { Feature } from '../../../types/project';

/** Numbered two-column list of features or challenges. */
export function FeatureList({ items }: { items: Feature[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="bg-bg p-5 sm:p-6 sm:[&:last-child:nth-child(odd)]:col-span-2"
        >
          <span className="font-mono text-xs text-fg-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-medium">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
