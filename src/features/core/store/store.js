import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// Get current environment
const isDev = process.env.NODE_ENV === 'development';
// Enable redux devtools chrome extension
const composeEnhancers = isDev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
// Initialise store side effects
const sagaMiddleware = createSagaMiddleware();
// Initialise middlewares, enable logger if env is development
const middlewares = isDev ? [sagaMiddleware, logger] : [sagaMiddleware];
// Initialise store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
// Apply persist to store
const persistor = persistStore(store);

// Initialise redux-saga (store side effects)
sagaMiddleware.run(rootSaga);

export { store, persistor };
