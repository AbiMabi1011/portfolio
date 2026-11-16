import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Research } from './components/Research';
import { EngineeringPlaybook } from './components/EngineeringPlaybook';
import { Skills } from './components/Skills';
import { Credentials } from './components/Credentials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { DevTerminal } from './components/DevTerminal';
import { ResumeModal } from './components/ResumeModal';
import { FloatingConnect } from './components/FloatingConnect';
import type { ProjectItem } from './data/portfolioData';

export function App() {
  const [accent, setAccent] = useState<'blue' | 'emerald'>('blue');
  const [commandOpen, setCommandOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleAccent = () =>
    setAccent((prev) => (prev === 'blue' ? 'emerald' : 'blue'));

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <div className={resumeOpen ? 'print:hidden' : ''}>
        <Navbar
          accent={accent}
          onToggleAccent={toggleAccent}
          onOpenCommand={() => setCommandOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <main>
          <Hero
            accent={accent}
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
          />
          <Experience accent={accent} />
          <Projects
            accent={accent}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />
          <Research accent={accent} />
          <EngineeringPlaybook accent={accent} />
          <Skills accent={accent} />
          <Credentials accent={accent} />
          <Contact accent={accent} />
        </main>
        <Footer />
      </div>
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        accent={accent}
        onToggleAccent={toggleAccent}
        onSelectProject={(project) => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          setSelectedProject(project);
        }}
      />
      <DevTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        accent={accent}
        onSetAccent={setAccent}
      />
      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        accent={accent}
      />
      <FloatingConnect
        accent={accent}
        onOpenResume={() => setResumeOpen(true)}
      />
    </div>
  );
}

export default App;
