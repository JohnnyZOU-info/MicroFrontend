import * as React from 'react';
import { Notes } from './features/notes/Notes';
import './App.css';

const App: React.FC<{ initialHtmlText: string }> = ({ initialHtmlText }) => {
  return (
    <Notes initialHtmlText={initialHtmlText} />
  );
}

export default App;
