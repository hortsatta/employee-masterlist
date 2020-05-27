import { takeLatest, all, call, put } from 'redux-saga/effects';

import { setNotificationError } from 'features/core/store/core.actions';
import { getJobTitlesByDepartmentIds } from '../job-title.service';
import { JobTitleActionTypes, fetchJobTitlesByDepartmentIdsSuccess, fetchJobTitlesByDepartmentIdsFailure } from './job-title.actions';

function* onFetchJobTitlesByDepartmentIdsStart() {
  yield takeLatest(
    JobTitleActionTypes.FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_START,
    function* ({ payload: { ids, isActive } }) {
      try {
        const jobTitles = yield call(getJobTitlesByDepartmentIds, ids, isActive);
        yield put(fetchJobTitlesByDepartmentIdsSuccess(jobTitles));
      } catch (errorMessage) {
        yield put(fetchJobTitlesByDepartmentIdsFailure());
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

export default function* jobTitlesSagas() {
  yield all([
    call(onFetchJobTitlesByDepartmentIdsStart)
  ]);
}
