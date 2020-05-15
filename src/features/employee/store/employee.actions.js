const EmployeeActionTypes = {
  FETCH_INITIAL_PAGE_EMPLOYEES_START: 'FETCH_INITIAL_PAGE_EMPLOYEES_START',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_START: 'FETCH_PREVIOUS_PAGE_EMPLOYEES_START',
  FETCH_NEXT_PAGE_EMPLOYEES_START: 'FETCH_NEXT_PAGE_EMPLOYEES_START',
  FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS: 'FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS: 'FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS',
  FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS: 'FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS',
  FETCH_PAGE_EMPLOYEES_FAILURE: 'FETCH_PAGE_EMPLOYEES_FAILURE',
  SET_CURRENT_PAGE_KEY: 'SET_CURRENT_PAGE_KEY'
};

const fetchInitialPageEmployeesStart = (isActive, sortBy) => ({
  type: EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_START,
  payload: { isActive, sortBy }
});

const fetchPreviousPageEmployeesStart = (isActive, sortBy) => ({
  type: EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_START,
  payload: { isActive, sortBy }
});

const fetchNextPageEmployeesStart = (isActive, sortBy) => ({
  type: EmployeeActionTypes.FETCH_NEXT_PAGE_EMPLOYEES_START,
  payload: { isActive, sortBy }
});

const fetchInitialPageEmployeesSuccess = (employees, collectionSize) => ({
  type: EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS,
  payload: { employees, collectionSize }
});

const fetchPreviousPageEmployeesSuccess = (employees, pageIndex) => ({
  type: EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS,
  payload: { employees, pageIndex }
});

const fetchNextPageEmployeesSuccess = (employees, pageIndex) => ({
  type: EmployeeActionTypes.FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS,
  payload: { employees, pageIndex }
});

const fetchPageEmployeesFailure = () => ({
  type: EmployeeActionTypes.FETCH_PAGE_EMPLOYEES_FAILURE
});

const setCurrentPageKey = (pageKey) => ({
  type: EmployeeActionTypes.SET_CURRENT_PAGE_KEY,
  payload: pageKey
});

export {
  EmployeeActionTypes,
  fetchInitialPageEmployeesStart,
  fetchPreviousPageEmployeesStart,
  fetchNextPageEmployeesStart,
  fetchInitialPageEmployeesSuccess,
  fetchPreviousPageEmployeesSuccess,
  fetchNextPageEmployeesSuccess,
  fetchPageEmployeesFailure,
  setCurrentPageKey
};
