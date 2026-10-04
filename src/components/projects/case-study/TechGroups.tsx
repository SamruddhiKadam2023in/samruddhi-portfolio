import type { TechGroup } from '../../../types/project';
import { Tag } from '../../common/Tag';

export function TechGroups({ groups }: { groups: TechGroup[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {groups.map((group) => (
        <div key={group.label} className="grid gap-3 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <dt className="font-mono text-xs tracking-wider text-fg-muted uppercase sm:pt-1">
            {group.label}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
