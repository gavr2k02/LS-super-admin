import { render } from 'preact';
import { BrowserRouter } from 'react-router-dom';

import App from './app/screens';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')!,
);
