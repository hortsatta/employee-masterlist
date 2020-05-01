import { AuthActionTypes } from './auth.actions';

const INITIAL_STATE = {
  isLoading: false,
  currentUser: null,
  showSignInDialog: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      };
    case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false
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
