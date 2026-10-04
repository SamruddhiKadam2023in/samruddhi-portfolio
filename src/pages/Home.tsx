import { About } from '../components/about/About';
import { Hero } from '../components/hero/Hero';
import { TechStrip } from '../components/hero/TechStrip';
import { navItems } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const built = new Set(['home', 'about']);

export default function Home() {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <TechStrip />
      <About />
      {/* Placeholder sections, replaced phase by phase. */}
      {navItems
        .filter((item) => !built.has(item.id))
        .map((item) => (
          <section
            key={item.id}
            id={item.id}
            aria-label={item.label}
            className="container-page flex min-h-[80vh] items-center border-t border-line"
          >
            <h2 className="text-3xl font-semibold tracking-tight">{item.label}</h2>
          </section>
        ))}
    </>
  );
}
