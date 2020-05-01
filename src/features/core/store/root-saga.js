import { all, call } from 'redux-saga/effects';

import { authSagas } from 'features/auth/store';
import { departmentSagas } from 'features/department/store';
import { jobTitleSagas } from 'features/job-title/store';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(departmentSagas),
    call(jobTitleSagas)
  ]);
}
