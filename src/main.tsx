import { createRoot } from 'react-dom/client';
import { IDOS_TITLE_ID } from './idos.title';
import { App } from './modules/last-baursak/components/App';
import './modules/last-baursak/components/style.css';
// A Title-bound artifact runs the official iDos Games host. An unbound copy offers local practice.
if (IDOS_TITLE_ID) void import('./platform');
else createRoot(document.getElementById('app')!).render(<App />);
