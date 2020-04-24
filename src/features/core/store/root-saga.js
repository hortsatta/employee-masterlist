import { all, call } from 'redux-saga/effects';

import { authSagas } from '../../auth/store';

export default function* rootSaga() {
  yield all([
    call(authSagas)
  ]);
}
