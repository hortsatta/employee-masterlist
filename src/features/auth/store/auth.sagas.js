import { takeLatest, all, call } from 'redux-saga/effects';
import { AuthActionTypes } from './auth.actions';

function* signInWithEmail() {
  yield console.log('Sign In');
  // TODO sign-in with email;
}

function* onSignInStart() {
  yield takeLatest(AuthActionTypes.SIGN_IN_START, signInWithEmail);
}

export default function* authSagas() {
  yield all([
    call(onSignInStart)
  ]);
}
