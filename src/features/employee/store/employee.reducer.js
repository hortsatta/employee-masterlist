import { EmployeeActionTypes } from './employee.actions';

const INITIAL_STATE = {
  isPageLoading: false,
  isEmployeeLoading: false,
  employee: undefined,
  pageEmployees: undefined,
  collectionSize: undefined,
  currentPage: { index: 0, isLast: true }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EmployeeActionTypes.FETCH_EMPLOYEE_START:
      return {
        ...state,
        isEmployeeLoading: true
      };
    case EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_START:
    case EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_START:
    case EmployeeActionTypes.FETCH_NEXT_PAGE_EMPLOYEES_START:
      return {
        ...state,
        isPageLoading: true
      };
    case EmployeeActionTypes.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isEmployeeLoading: false,
        employee: action.payload
      };
    case EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS: {
      const { employees, collectionSize } = action.payload;
      return {
        ...state,
        isPageLoading: false,
        pageEmployees: { 1: employees },
        collectionSize,
        currentPage: { index: 1, isLast: collectionSize <= employees.length }
      };
    }
    case EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS: {
      const { employees, pageIndex } = action.payload;
      return {
        ...state,
        isPageLoading: false,
        pageEmployees: { ...state.pageEmployees, [pageIndex]: employees },
        currentPage: { index: pageIndex, isLast: false }
      };
    }
    case EmployeeActionTypes.FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS: {
      const { employees, pageIndex } = action.payload;
      const newEmployees = { ...state.pageEmployees, [pageIndex]: employees };
      const pageCount = Object.values(newEmployees).length;
      const totalEmployeesCount = Object.values(newEmployees)
        .reduce((count, row) => count + row.length, 0);
      return {
        ...state,
        isPageLoading: false,
        pageEmployees: newEmployees,
        currentPage: {
          index: pageIndex,
          isLast: (state.collectionSize <= totalEmployeesCount) && (pageIndex >= pageCount)
        }
      };
    }
    case EmployeeActionTypes.FETCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        isEmployeeLoading: false
      };
    case EmployeeActionTypes.FETCH_PAGE_EMPLOYEES_FAILURE:
      return {
        ...state,
        isPageLoading: false
      };
    default:
      return state;
  }
};
