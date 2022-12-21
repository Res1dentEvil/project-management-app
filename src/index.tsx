import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import Preloader from 'components/UI/Preloader/Preloader';
import './18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Suspense fallback={<Preloader />}>
      <App />
    </Suspense>
  </BrowserRouter>
);
