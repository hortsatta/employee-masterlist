import { takeLatest, all, call, put } from 'redux-saga/effects';

import { setNotificationError } from 'features/core/store/core.actions';
import { getAllDepartments } from '../department.service';
import { DepartmentActionTypes, fetchAllDepartmentsSuccess, fetchAllDepartmentsFailure } from './department.actions';

function* onFetchAllDepartmentsStart() {
  yield takeLatest(
    DepartmentActionTypes.FETCH_ALL_DEPARTMENTS_START,
    function* ({ payload }) {
      try {
        const departments = yield call(getAllDepartments, payload);
        yield put(fetchAllDepartmentsSuccess(departments));
      } catch (errorMessage) {
        yield put(fetchAllDepartmentsFailure());
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

export default function* departmentSagas() {
  yield all([
    call(onFetchAllDepartmentsStart)
  ]);
}
