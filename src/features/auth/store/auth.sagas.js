import { takeLatest, all, call } from 'redux-saga/effects';

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
      } catch (error) {
        console.log('error', error.message);
      }
    }
  );
}

export default function* authSagas() {
  yield all([
    call(onSignInStart)
  ]);
}
