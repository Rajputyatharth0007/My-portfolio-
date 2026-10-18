import { useEffect } from 'react';
import markup from './portfolioMarkup.html?raw';
import { runLegacyInteractions } from './legacyInteractions.js';
import './index.css';

export default function App() {
  useEffect(() => runLegacyInteractions(), []);
  return <div className="page-content" dangerouslySetInnerHTML={{ __html: markup }} />;
}
