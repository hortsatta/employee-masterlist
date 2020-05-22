import { takeLatest, all, call, put, delay } from 'redux-saga/effects';

import { setNotificationError, setNotificationSuccess } from 'features/core/store/core.actions';
import { getEmployeeById } from 'features/employee/services';
import { getUserSnapshotById, getCurrentUser, signOutUser } from '../../user-account/user-account.service';
import { signInWithEmail } from '../auth.service';
import {
  AuthActionTypes,
  signInFailure,
  signInSuccess,
  signOutSuccess,
  toggleSignInDialog,
  fetchCurrentEmployeeSuccess,
  fetchCurrentEmployeeFailure
} from './auth.actions';

function* onSignInStart() {
  yield takeLatest(
    AuthActionTypes.SIGN_IN_START,
    function* ({ payload }) {
      try {
        const { uid } = yield call(signInWithEmail, payload);
        const userSnapshot = yield call(getUserSnapshotById, uid);
        yield put(signInSuccess(userSnapshot.data()));
        yield put(toggleSignInDialog());
      } catch (errorMessage) {
        yield put(signInFailure());
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

function* onSignOutStart() {
  yield takeLatest(
    AuthActionTypes.SIGN_OUT_START,
    function* () {
      try {
        yield signOutUser();
        yield delay(500);
        yield put(signOutSuccess());
        yield put(setNotificationSuccess('User successfully signed out.'));
      } catch (errorMessage) {
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

function* onCheckSignInSession() {
  yield takeLatest(
    AuthActionTypes.CHECK_SIGN_IN_SESSION,
    function* () {
      try {
        const { uid } = yield getCurrentUser(); console.log('userAuth', uid);
        const userSnapshot = yield call(getUserSnapshotById, uid);
        yield put(signInSuccess(userSnapshot.data()));
      } catch (errorMessage) {
        yield put(signInFailure(errorMessage));
      }
    }
  );
}

function* onFetchCurrentEmployeeStart() {
  yield takeLatest(
    AuthActionTypes.FETCH_CURRENT_EMPLOYEE_START,
    function* ({ payload }) {
      try {
        const employee = yield call(getEmployeeById, payload);
        yield put(fetchCurrentEmployeeSuccess(employee));
      } catch (errorMessage) {
        yield put(fetchCurrentEmployeeFailure());
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

export default function* authSagas() {
  yield all([
    call(onSignInStart),
    call(onSignOutStart),
    call(onCheckSignInSession),
    call(onFetchCurrentEmployeeStart)
  ]);
}
