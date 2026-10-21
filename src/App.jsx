import { useEffect } from 'react';
import markup from './portfolioMarkup.html?raw';
import { runLegacyInteractions } from './legacyInteractions.js';
import Threads from './components/Threads.jsx';
import './index.css';

export default function App() {
  useEffect(() => runLegacyInteractions(), []);
  return <><div className="brand-motion-bg" aria-hidden="true"><Threads color={[0, 123 / 255, 167 / 255]} accentColor={[1, 45 / 255, 149 / 255]} lineCount={72} amplitude={1.25} distance={0.34} thickness={0.55} softness={1.4} speed={0.28} waves={1.2} angle={18} brightness={1.1} fade={0.18} opacity={0.32} enableMouseInteraction={false} /></div><div className="page-content" dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
