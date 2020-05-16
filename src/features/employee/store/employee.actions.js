const EmployeeActionTypes = {
  FETCH_EMPLOYEE_START: 'FETCH_EMPLOYEE_START',
  FETCH_INITIAL_PAGE_EMPLOYEES_START: 'FETCH_INITIAL_PAGE_EMPLOYEES_START',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_START: 'FETCH_PREVIOUS_PAGE_EMPLOYEES_START',
  FETCH_NEXT_PAGE_EMPLOYEES_START: 'FETCH_NEXT_PAGE_EMPLOYEES_START',
  FETCH_EMPLOYEE_SUCCESS: 'FETCH_EMPLOYEE_SUCCESS',
  FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS: 'FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS: 'FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS',
  FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS: 'FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS',
  FETCH_EMPLOYEE_FAILURE: 'FETCH_EMPLOYEE_FAILURE',
  FETCH_PAGE_EMPLOYEES_FAILURE: 'FETCH_PAGE_EMPLOYEES_FAILURE'
};

const fetchEmployeeStart = (id) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_START,
  payload: id
});

const fetchInitialPageEmployeesStart = (pageKey, isActive, sortBy) => ({
  type: EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_START,
  payload: { pageKey, isActive, sortBy }
});

const fetchPreviousPageEmployeesStart = (pageKey, isActive, sortBy) => ({
  type: EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_START,
  payload: { pageKey, isActive, sortBy }
});

const fetchNextPageEmployeesStart = (pageKey, isActive, sortBy) => ({
  type: EmployeeActionTypes.FETCH_NEXT_PAGE_EMPLOYEES_START,
  payload: { pageKey, isActive, sortBy }
});

const fetchEmployeeSuccess = (employee) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_SUCCESS,
  payload: employee
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

const fetchEmployeeFailure = () => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_FAILURE
});

const fetchPageEmployeesFailure = () => ({
  type: EmployeeActionTypes.FETCH_PAGE_EMPLOYEES_FAILURE
});

export {
  EmployeeActionTypes,
  fetchEmployeeStart,
  fetchInitialPageEmployeesStart,
  fetchPreviousPageEmployeesStart,
  fetchNextPageEmployeesStart,
  fetchEmployeeSuccess,
  fetchInitialPageEmployeesSuccess,
  fetchPreviousPageEmployeesSuccess,
  fetchNextPageEmployeesSuccess,
  fetchEmployeeFailure,
  fetchPageEmployeesFailure
};
