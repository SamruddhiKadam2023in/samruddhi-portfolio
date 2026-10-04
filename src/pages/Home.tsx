import { Hero } from '../components/hero/Hero';
import { TechStrip } from '../components/hero/TechStrip';
import { navItems } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <TechStrip />
      {/* Placeholder sections, replaced phase by phase. */}
      {navItems
        .filter((item) => item.id !== 'home')
        .map((item) => (
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
