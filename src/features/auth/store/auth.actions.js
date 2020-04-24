const AuthActionTypes = {
  SIGN_IN_START: 'SIGN_IN_START',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  TOGGLE_SIGN_IN_DIALOG: 'TOGGLE_SIGN_IN_DIALOG'
};

const signInStart = (credentials) => ({
  type: AuthActionTypes.SIGN_IN_START,
  payload: credentials
});

const signInSuccess = (user) => ({
  type: AuthActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

const signInFailure = () => ({
  type: AuthActionTypes.SIGN_IN_FAILURE
});

const toggleSignInDialog = () => ({
  type: AuthActionTypes.TOGGLE_SIGN_IN_DIALOG
});

export {
  AuthActionTypes,
  signInStart,
  signInSuccess,
  signInFailure,
  toggleSignInDialog
};
