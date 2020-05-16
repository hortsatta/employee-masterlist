import { PAGE_KEYS } from 'config/system.config';
import { EmployeeActionTypes } from './employee.actions';

const INITIAL_STATE = {
  isLoading: false,
  pageEmployees: undefined,
  collectionSize: undefined,
  currentPage: { index: 0, isLast: true },
  currentPagekey: PAGE_KEYS.employees.fullName
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_START:
    case EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_START:
    case EmployeeActionTypes.FETCH_NEXT_PAGE_EMPLOYEES_START:
      return {
        ...state,
        isLoading: true
      };
    case EmployeeActionTypes.FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS: {
      const { employees, collectionSize } = action.payload;
      return {
        ...state,
        isLoading: false,
        pageEmployees: { 1: employees },
        collectionSize,
        currentPage: { index: 1, isLast: collectionSize <= employees.length }
      };
    }
    case EmployeeActionTypes.FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS: {
      const { employees, pageIndex } = action.payload;
      return {
        ...state,
        isLoading: false,
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
        isLoading: false,
        pageEmployees: newEmployees,
        currentPage: {
          index: pageIndex,
          isLast: (state.collectionSize <= totalEmployeesCount) && (pageIndex >= pageCount)
        }
      };
    }
    case EmployeeActionTypes.FETCH_PAGE_EMPLOYEES_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case EmployeeActionTypes.SET_CURRENT_PAGE_KEY:
      return {
        ...state,
        currentPagekey: action.payload
      };
    default:
      return state;
  }
};