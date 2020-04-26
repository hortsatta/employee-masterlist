import { takeLatest, all, call, put } from 'redux-saga/effects';

import { setNotificationError } from 'features/core/store';
import { getUserSnapshotById } from '../../user-account/user-account.service';
import { signInWithEmail } from '../auth.service';
import { AuthActionTypes } from './auth.actions';

function* onSignInStart() {
  yield takeLatest(
    AuthActionTypes.SIGN_IN_START,
    function* ({ payload }) {
      try {
        const { uid } = yield call(signInWithEmail, payload);
        const userSnapshot = yield call(getUserSnapshotById, uid);
        console.log('signIn', userSnapshot.data());
      } catch (errorMessage) {
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

export default function* authSagas() {
  yield all([
    call(onSignInStart)
  ]);
}
