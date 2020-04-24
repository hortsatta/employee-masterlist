import { AuthActionTypes } from './auth.actions';

const INITIAL_STATE = {
  loading: false,
  currentUser: null,
  showSignInDialog: false,
  error: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_START:
      return {
        ...state,
        loading: true
      };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null
      };
    case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AuthActionTypes.TOGGLE_SIGN_IN_DIALOG:
      return {
        ...state,
        showSignInDialog: !state.showSignInDialog
      };
    default:
      return state;
  }
};

export default authReducer;
