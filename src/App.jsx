import { useEffect } from 'react';
import markup from './portfolioMarkup.html?raw';
import { runLegacyInteractions } from './legacyInteractions.js';
import MoltenMetal from './components/MoltenMetal.jsx';
import './index.css';

export default function App() {
  useEffect(() => runLegacyInteractions(), []);
  return <><div className="brand-motion-bg" aria-hidden="true"><MoltenMetal colors={['#007BA7', '#FF2D95']} coreColor="#007BA7" backgroundColor="#0A0A0A" speed={0.22} scale={2.8} detail={4} glow={2.8} thickness={0.82} haze={0.96} mouseInteraction mouseStrength={0.55} flareOnClick brightness={1.45} colorMode="molten" opacity={1} dpr={1.5} /></div><div className="page-content" dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
