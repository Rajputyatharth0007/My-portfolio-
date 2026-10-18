import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import markup from './portfolioMarkup.html?raw';
import Threads from './components/Threads.jsx';
import SpotlightCard from './components/SpotlightCard.jsx';
import InspiraFloatingCard from './components/InspiraFloatingCard.jsx';
import { runLegacyInteractions } from './legacyInteractions.js';
import './index.css';

function mountProjectSpotlights() {
  const roots = [];
  [...document.querySelectorAll('.project')].forEach(card => {
    const inner = card.innerHTML;
    const className = card.className;
    const attributes = {};
    [...card.attributes].forEach(attr => { if (attr.name !== 'class') attributes[attr.name] = attr.value; });
    const host = document.createElement('div');
    host.className = 'project-spotlight-host';
    card.replaceWith(host);
    const root = createRoot(host);
    root.render(
      <SpotlightCard
        {...attributes}
        className={className}
        spotlightColor="rgba(112,239,165,0.38)"
        intensity={0.27}
        spotlightSize={310}
        softness={0.82}
        borderGlow={0.72}
        proximity={88}
        smoothing={0.26}
        ambient={false}
        flare
        grain={0.025}
      >
        <div className="project-card-content" dangerouslySetInnerHTML={{ __html: inner }} />
      </SpotlightCard>
    );
    roots.push(root);
  });
  return roots;
}

function mountInspiraFloatingCards() {
  const roots = [];
  [...document.querySelectorAll('.learn-card')].forEach(card => {
    const inner = card.innerHTML;
    const className = card.className.split(/\s+/).filter(name => name !== 'learn-card').join(' ');
    const host = document.createElement('div');
    host.className = 'inspired-float-host';
    card.replaceWith(host);
    const root = createRoot(host);
    root.render(
      <InspiraFloatingCard className={className}>
        <article className="learn-card" dangerouslySetInnerHTML={{ __html: inner }} />
      </InspiraFloatingCard>
    );
    roots.push(root);
  });
  return roots;
}

export default function App() {
  useEffect(() => {
    const roots = [...mountProjectSpotlights(), ...mountInspiraFloatingCards()];
    let cleanupInteractions;
    const initFrame = requestAnimationFrame(() => { cleanupInteractions = runLegacyInteractions(); });
    return () => {
      cancelAnimationFrame(initFrame);
      cleanupInteractions?.();
      roots.forEach(root => root.unmount());
    };
  }, []);

  return <>
    <div className="threads-background" aria-hidden="true">
      <Threads
        color={[0.12, 0.36, 0.21]}
        accentColor={[0.42, 0.94, 0.61]}
        amplitude={1.35}
        distance={0.28}
        enableMouseInteraction
        lineCount={54}
        thickness={0.52}
        softness={1.55}
        speed={0.34}
        waves={0.8}
        split={0.025}
        fray={0.22}
        angle={14}
        parting={0.42}
        taper={0.88}
        brightness={0.9}
        fade={0.18}
        opacity={0.8}
      />
    </div>
    <div className="page-content" dangerouslySetInnerHTML={{ __html: markup }} />
  </>;
}
