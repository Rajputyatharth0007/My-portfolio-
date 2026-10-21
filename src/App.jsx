import { useEffect } from 'react';
import markup from './portfolioMarkup.html?raw';
import { runLegacyInteractions } from './legacyInteractions.js';
import MoltenMetal from './components/MoltenMetal.jsx';
import './index.css';

export default function App() {
  useEffect(() => runLegacyInteractions(), []);
  return <><div className="brand-motion-bg" aria-hidden="true"><MoltenMetal colors={['#007BA7', '#FF2D95']} coreColor="#FF2D95" backgroundColor="#0A0A0A" speed={0.25} scale={4.5} detail={3} glow={1.15} thickness={1} haze={0.75} mouseInteraction mouseStrength={0.45} flareOnClick brightness={1.1} colorMode="molten" opacity={0.9} dpr={1.5} /></div><div className="page-content" dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
