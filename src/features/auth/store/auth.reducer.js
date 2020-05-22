import { AuthActionTypes } from './auth.actions';

const INITIAL_STATE = {
  isLoading: false,
  isCurrentEmployeeLoading: false,
  currentUser: undefined,
  currentEmployee: undefined,
  showSignInDialog: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActionTypes.SIGN_OUT_START:
      return {
        ...state,
        isLoading: true,
        isCurrentEmployeeLoading: true
      };
    case AuthActionTypes.FETCH_CURRENT_EMPLOYEE_START:
      return {
        ...state,
        isCurrentEmployeeLoading: true
      };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      };
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCurrentEmployeeLoading: false,
        currentUser: undefined,
        currentEmployee: undefined
      };
    case AuthActionTypes.SIGN_OUT_FAILURE:
    case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case AuthActionTypes.FETCH_CURRENT_EMPLOYEE_FAILURE:
      return {
        ...state,
        isCurrentEmployeeLoading: false
      };
    case AuthActionTypes.TOGGLE_SIGN_IN_DIALOG:
      return {
        ...state,
        showSignInDialog: !state.showSignInDialog
      };
    case AuthActionTypes.FETCH_CURRENT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isCurrentEmployeeLoading: false,
        currentEmployee: action.payload
      };
    default:
      return state;
  }
};
