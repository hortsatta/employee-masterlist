import { DepartmentActionTypes } from './department.actions';

const INITIAL_STATE = {
  isLoading: false,
  departments: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DepartmentActionTypes.FETCH_ALL_DEPARTMENTS_START:
      return {
        ...state,
        isLoading: true
      };
    case DepartmentActionTypes.FETCH_ALL_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        departments: action.payload
      };
    case DepartmentActionTypes.FETCH_ALL_DEPARTMENTS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
