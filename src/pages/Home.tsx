import { navItems } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// Phase 3 shell: placeholder sections so navigation can be tested. Filled in from Phase 4.
export default function Home() {
  useDocumentTitle();

  return (
    <>
      {navItems.map((item) => (
        <section
          key={item.id}
          id={item.id}
          aria-label={item.label}
          className="container-page flex min-h-[80vh] items-center border-b border-line"
        >
          <h2 className="text-3xl font-semibold tracking-tight">{item.label}</h2>
        </section>
      ))}
    </>
  );
}
