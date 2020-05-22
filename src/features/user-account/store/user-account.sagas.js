import { takeLatest, all, call, put } from 'redux-saga/effects';

import { setNotificationError } from 'features/core/store';
import { getAllUserRoles } from '../user-account.service';
import { UserAccountActionTypes, fetchAllUserRolesSuccess, fetchAllUserRolesFailure } from './user-account.actions';


function* onFetchAllUserRolesStart() {
  yield takeLatest(
    UserAccountActionTypes.FETCH_ALL_USER_ROLES_START,
    function* ({ payload }) {
      try {
        const userRoles = yield call(getAllUserRoles, payload);
        yield put(fetchAllUserRolesSuccess(userRoles));
      } catch (errorMessage) {
        yield put(fetchAllUserRolesFailure());
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

export default function* userAccountSagas() {
  yield all([
    call(onFetchAllUserRolesStart)
  ]);
}
