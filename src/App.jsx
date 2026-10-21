import { useEffect } from 'react';
import markup from './portfolioMarkup.html?raw';
import { runLegacyInteractions } from './legacyInteractions.js';
import Threads from './components/Threads.jsx';
import './index.css';

export default function App() {
  useEffect(() => runLegacyInteractions(), []);
  return <><div className="brand-motion-bg" aria-hidden="true"><Threads color={[0, 123 / 255, 167 / 255]} accentColor={[1, 45 / 255, 149 / 255]} lineCount={110} amplitude={1.65} distance={0.42} thickness={0.72} softness={1.5} speed={0.34} waves={1.3} angle={18} brightness={1.35} fade={0.08} opacity={0.72} enableMouseInteraction={false} /></div><div className="page-content" dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
