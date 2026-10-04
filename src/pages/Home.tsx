import { About } from '../components/about/About';
import { Contact } from '../components/contact/Contact';
import { Hero } from '../components/hero/Hero';
import { TechStrip } from '../components/hero/TechStrip';
import { Projects } from '../components/projects/Projects';
import { SkillSelectionProvider } from '../components/skills/SkillSelectionProvider';
import { Skills } from '../components/skills/Skills';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle();

  return (
    <SkillSelectionProvider>
      <Hero />
      <TechStrip />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </SkillSelectionProvider>
  );
}
