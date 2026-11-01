import { useEffect } from 'react';
import markup from './portfolioMarkup.html?raw';
import { runLegacyInteractions } from './legacyInteractions.js';
import CinematicArchitecture from './components/CinematicArchitecture.jsx';
import './index.css';

export default function App() {
  useEffect(() => runLegacyInteractions(), []);

  return (
    <>
      <CinematicArchitecture />
      <div className="page-content" dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}
