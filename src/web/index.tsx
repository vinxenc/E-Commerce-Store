import * as React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';

import App from './app';

// eslint-disable-next-line no-undef
const rootElement = document.getElementById('root') as Element;
const rootDom = ReactDOM.createRoot(rootElement);

rootDom.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);
