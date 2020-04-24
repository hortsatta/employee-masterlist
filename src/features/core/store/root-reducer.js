import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import coreReducer from './core.reducer';
import { authReducer } from '../../auth/store';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['core']
};

// combine all redux reducers
const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer
});

// Use redux-persist with config to keep data in localstorage
export default persistReducer(persistConfig, rootReducer);
