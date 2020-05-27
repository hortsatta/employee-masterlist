import { takeLatest, all, call, put, select, debounce } from 'redux-saga/effects';

import { PageMode, pageKeys } from 'config/system.config';
import { setNotificationError } from 'features/core/store';
import {
  getPageEmployees,
  getEmployeesCollectionCount,
  getEmployeeById,
  getEmployeesByKeyword,
  getNewlyHiredEmployee
} from '../services';
import {
  EmployeeActionTypes,
  fetchInitialPageEmployeesSuccess,
  fetchPageEmployeesFailure,
  fetchNextPageEmployeesSuccess,
  fetchPreviousPageEmployeesSuccess,
  fetchEmployeeSuccess,
  fetchEmployeeFailure,
  fetchEmployeesByKeywordSuccess,
  fetchEmployeesByKeywordFailure,
  fetchEmployeesByKeywordCancelled,
  fetchInitialPageEmployeesStart,
  fetchNewlyHiredEmployeeFailure,
  fetchNewlyHiredEmployeeSuccess
} from './employee.actions';
import { selectCurrentPage, selectPageEmployees } from './employee.selectors';

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

function* onFetchEmployeeStart() {
  yield takeLatest(
    EmployeeActionTypes.FETCH_EMPLOYEE_START,
    function* ({ payload }) {
      try {
        const employee = yield call(getEmployeeById, payload);
        yield put(fetchEmployeeSuccess(employee));
      } catch (errorMessage) {
        yield put(fetchEmployeeFailure());
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

function* onFetchNewlyHiredEmployeeStart() {
  yield takeLatest(
    EmployeeActionTypes.FETCH_NEWLY_HIRED_EMPLOYEE_START,
    function* () {
      try {
        const employee = yield call(getNewlyHiredEmployee);
        yield put(fetchNewlyHiredEmployeeSuccess(employee));
      } catch (errorMessage) {
        yield put(fetchNewlyHiredEmployeeFailure());
        yield put(setNotificationError(errorMessage));
      }
    }
  );
}

function* onFetchEmployeeByKeywordStart() {
  yield debounce(
    300,
    EmployeeActionTypes.FETCH_EMPLOYEES_BY_KEYWORD_START,
    function* ({ payload }) {
      try {
        const { keyword, pageKey, isActive, sortBy } = payload;

        if (keyword.length < 2) {
          yield put(fetchEmployeesByKeywordCancelled());

          if (keyword.length < 1) {
            yield put(fetchInitialPageEmployeesStart(pageKey, isActive, sortBy));
            return;
          }

          return;
        }

        const employees = yield call(getEmployeesByKeyword, keyword, isActive);
        yield put(fetchEmployeesByKeywordSuccess(employees));
      } catch (errorMessage) {
        yield put(fetchEmployeesByKeywordFailure());
        yield put(setNotificationError(errorMessage));
      }    
    }  
  );
}

function* onFetchInitialPageEmployeesStart() {
  yield takeLatest(
    EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_START,
    function* ({ payload }) {
      try {
        const { pageKey, isActive, sortBy } = payload;
        const collectionSize = yield call(getEmployeesCollectionCount, isActive); 
        const employees = yield call(getPageEmployees, { field: pageKey }, isActive, sortBy);
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
        const {
          newPageIndex,
          currentEmployees,
          newEmployees
        } = yield call(getPageAndEmployees, false);

        if (!currentEmployees?.length) { return; }

        if (!newEmployees) {
          const { pageKey, isActive, sortBy } = payload;
          const target = currentEmployees[0];
          const employees = yield call(
            getPageEmployees,
            {
              mode: PageMode.PREVIOUS,
              field: pageKey,
              pageKey: pageKey === pageKeys.employees.fullName
                ? target.pageKey.fullName : target.pageKey.hireDate
            },
            isActive,
            sortBy
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
        const {
          newPageIndex,
          currentEmployees,
          newEmployees
        } = yield call(getPageAndEmployees, true);

        if (!currentEmployees?.length) { return; }

        if (!newEmployees) {
          const { pageKey, isActive, sortBy } = payload;
          const target = currentEmployees[currentEmployees.length - 1];
          const employees = yield call(
            getPageEmployees,
            {
              mode: PageMode.NEXT,
              field: pageKey,
              pageKey: pageKey === pageKeys.employees.fullName
                ? target.pageKey.fullName : target.pageKey.hireDate
            },
            isActive,
            sortBy
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
    call(onFetchEmployeeStart),
    call(onFetchNewlyHiredEmployeeStart),
    call(onFetchEmployeeByKeywordStart),
    call(onFetchInitialPageEmployeesStart),
    call(onFetchPreviousEmployeesStart),
    call(onFetchNextEmployeesStart)
  ]);
}
