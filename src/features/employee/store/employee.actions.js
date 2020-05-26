const EmployeeActionTypes = {
  // For fetching single employee by id
  FETCH_EMPLOYEE_START: 'FETCH_EMPLOYEE_START',
  FETCH_EMPLOYEE_SUCCESS: 'FETCH_EMPLOYEE_SUCCESS',
  FETCH_EMPLOYEE_FAILURE: 'FETCH_EMPLOYEE_FAILURE',
  // For fetching latest employee
  FETCH_NEWLY_HIRED_EMPLOYEE_START: 'FETCH_NEWLY_HIRED_EMPLOYEE_START',
  FETCH_NEWLY_HIRED_EMPLOYEE_SUCCESS: 'FETCH_NEWLY_HIRED_EMPLOYEE_SUCCESS',
  FETCH_NEWLY_HIRED_EMPLOYEE_FAILURE: 'FETCH_NEWLY_HIRED_EMPLOYEE_FAILURE',
  // For searching
  FETCH_EMPLOYEES_BY_KEYWORD_START: 'FETCH_EMPLOYEES_BY_KEYWORD_START',
  FETCH_EMPLOYEES_BY_KEYWORD_SUCCESS: 'FETCH_EMPLOYEES_BY_KEYWORD_SUCCESS',
  FETCH_EMPLOYEES_BY_KEYWORD_FALURE: 'FETCH_EMPLOYEES_BY_KEYWORD_FALURE',
  FETCH_EMPLOYEES_BY_KEYWORD_CANCELLED: 'FETCH_EMPLOYEES_BY_KEYWORD_CANCELLED',
  // For pagination
  FETCH_INITIAL_PAGE_EMPLOYEES_START: 'FETCH_INITIAL_PAGE_EMPLOYEES_START',
  FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS: 'FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_START: 'FETCH_PREVIOUS_PAGE_EMPLOYEES_START',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS: 'FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS',
  FETCH_NEXT_PAGE_EMPLOYEES_START: 'FETCH_NEXT_PAGE_EMPLOYEES_START',
  FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS: 'FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS',
  FETCH_PAGE_EMPLOYEES_FAILURE: 'FETCH_PAGE_EMPLOYEES_FAILURE'
};

const fetchEmployeeStart = (id) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_START,
  payload: id
});

const fetchNewlyHiredEmployeeStart = () => ({
  type: EmployeeActionTypes.FETCH_NEWLY_HIRED_EMPLOYEE_START
});

const fetchEmployeesByKeywordStart = (keyword, pageKey, isActive, sortBy) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEES_BY_KEYWORD_START,
  payload: { keyword, pageKey, isActive, sortBy }
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

const fetchNewlyHiredEmployeeSuccess = (employee) => ({
  type: EmployeeActionTypes.FETCH_NEWLY_HIRED_EMPLOYEE_SUCCESS,
  payload: employee
});

const fetchEmployeesByKeywordSuccess = (employees) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEES_BY_KEYWORD_SUCCESS,
  payload: employees
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

const fetchNewlyHiredEmployeeFailure = () => ({
  type: EmployeeActionTypes.FETCH_NEWLY_HIRED_EMPLOYEE_FAILURE
});

const fetchEmployeesByKeywordFailure = () => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEES_BY_KEYWORD_FALURE
});

const fetchEmployeesByKeywordCancelled = () => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEES_BY_KEYWORD_CANCELLED
});

const fetchPageEmployeesFailure = () => ({
  type: EmployeeActionTypes.FETCH_PAGE_EMPLOYEES_FAILURE
});

export {
  EmployeeActionTypes,
  fetchEmployeeStart,
  fetchNewlyHiredEmployeeStart,
  fetchEmployeesByKeywordStart,
  fetchInitialPageEmployeesStart,
  fetchPreviousPageEmployeesStart,
  fetchNextPageEmployeesStart,
  fetchEmployeeSuccess,
  fetchNewlyHiredEmployeeSuccess,
  fetchEmployeesByKeywordSuccess,
  fetchInitialPageEmployeesSuccess,
  fetchPreviousPageEmployeesSuccess,
  fetchNextPageEmployeesSuccess,
  fetchEmployeeFailure,
  fetchNewlyHiredEmployeeFailure,
  fetchEmployeesByKeywordFailure,
  fetchEmployeesByKeywordCancelled,
  fetchPageEmployeesFailure
};
