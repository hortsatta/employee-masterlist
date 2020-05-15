import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from 'features/auth/store';
import { departmentReducer } from 'features/department/store';
import { jobTitleReducer } from 'features/job-title/store';
import { employeeReducer } from 'features/employee/store';
import coreReducer from './core.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['core']
};

// combine all redux reducers
const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  departments: departmentReducer,
  jobTitles: jobTitleReducer,
  employees: employeeReducer
});

// Use redux-persist with config to keep data in localstorage
export default persistReducer(persistConfig, rootReducer);
