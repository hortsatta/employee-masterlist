import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FocusStyleManager } from '@blueprintjs/core';

import './index.scss';
import { history } from 'common/services';
import { store, persistor } from './features/core/store';
import RootPage from './features/core/pages';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <RootPage />
      </Router>
    </PersistGate>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// only show focus outline on tab (only for buttons)
FocusStyleManager.onlyShowFocusOnTabs();
