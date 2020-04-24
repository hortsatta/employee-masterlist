import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FocusStyleManager } from '@blueprintjs/core';

import './index.scss';
import { store, persistor } from './features/core/store';
import Layout from './features/core/templates';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// only show focus outline on tab (only for buttons)
FocusStyleManager.onlyShowFocusOnTabs();
