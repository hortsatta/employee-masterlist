import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import { PAGE_MODE } from 'config/system.config';
import { setNotificationError } from 'features/core/store';
import { getPageEmployees, getEmployeesCollectionCount } from '../employee.service';
import {
  EmployeeActionTypes,
  fetchInitialPageEmployeesSuccess,
  fetchPageEmployeesFailure,
  fetchNextPageEmployeesSuccess,
  fetchPreviousPageEmployeesSuccess
} from './employee.actions';
import { selectCurrentPage, selectPageEmployees, selectCurrentPageKey } from './employee.selectors';

function* dispatchError(errorMessage) {
  yield put(fetchPageEmployeesFailure());
  yield put(setNotificationError(errorMessage));
}

function* getPageAndEmployees(isNext) {
  const currentPage = yield select(selectCurrentPage());
  const newPageIndex = isNext ? (currentPage.index + 1) : (currentPage.index - 1);
  const currentEmployees = yield select(selectPageEmployees(currentPage.index)); 
  const newEmployees = yield select(selectPageEmployees(newPageIndex));
  return { newPageIndex, currentEmployees, newEmployees };
}

function* onFetchInitialEmployeesStart() {
  yield takeLatest(
    EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_START,
    function* ({ payload }) {
      try {
        const { isActive, sortBy } = payload;
        const collectionSize = yield call(getEmployeesCollectionCount, isActive);
        const currentPageKey = yield select(selectCurrentPageKey); console.log(currentPageKey);
        const employees = yield call(getPageEmployees, { field: currentPageKey }, isActive, sortBy);
        yield put(fetchInitialPageEmployeesSuccess(employees, collectionSize));
      } catch (errorMessage) {
        yield dispatchError(errorMessage);
      }
    }
  );
}

function* onFetchPreviousEmployeesStart() {
  yield takeLatest(
    EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_START,
    function* ({ payload }) {
      try {
        const { newPageIndex, currentEmployees, newEmployees } = yield call(getPageAndEmployees, false);

        if (!currentEmployees?.length) { return; }

        if (!newEmployees) {
          const currentPageKey = yield select(selectCurrentPageKey);
          const target = currentEmployees[0];
          const employees = yield call(
            getPageEmployees,
            {
              mode: PAGE_MODE.back,
              field: currentPageKey,
              pageKey: target.pageKey.fullName
            },
            payload
          );
          yield put(fetchPreviousPageEmployeesSuccess(employees, newPageIndex));
        } else {
          yield put(fetchPreviousPageEmployeesSuccess(newEmployees, newPageIndex));
        }
      } catch (errorMessage) {
        yield dispatchError(errorMessage);
      }
    }
  );
}

function* onFetchNextEmployeesStart() {
  yield takeLatest(
    EmployeeActionTypes.FETCH_NEXT_PAGE_EMPLOYEES_START,
    function* ({ payload }) {
      try {
        const { newPageIndex, currentEmployees, newEmployees } = yield call(getPageAndEmployees, true);

        if (!currentEmployees?.length) { return; }

        if (!newEmployees) {
          const currentPageKey = yield select(selectCurrentPageKey);
          const target = currentEmployees[currentEmployees.length - 1];
          const employees = yield call(
            getPageEmployees,
            {
              mode: PAGE_MODE.next,
              field: currentPageKey,
              pageKey: target.pageKey.fullName
            },
            payload
          );
          yield put(fetchNextPageEmployeesSuccess(employees, newPageIndex));
        } else {
          yield put(fetchNextPageEmployeesSuccess(newEmployees, newPageIndex));
        }
      } catch (errorMessage) {
        yield dispatchError(errorMessage);
      }
    }
  );
}

export default function* employeeSagas() {
  yield all([
    call(onFetchInitialEmployeesStart),
    call(onFetchPreviousEmployeesStart),
    call(onFetchNextEmployeesStart)
  ]);
}
