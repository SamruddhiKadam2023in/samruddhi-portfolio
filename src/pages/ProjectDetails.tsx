import { useParams } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// Phase 3 shell: route placeholder. The case study is built in Phase 8.
export default function ProjectDetails() {
  const { slug } = useParams();
  useDocumentTitle(slug);

  return (
    <section className="container-page py-24">
      <p className="font-mono text-sm text-fg-muted">/projects/{slug}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Case study</h1>
    </section>
  );
}
