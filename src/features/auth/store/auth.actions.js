const AuthActionTypes = {
  SIGN_IN_START: 'SIGN_IN_START',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_OUT_START: 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
  CHECK_SIGN_IN_SESSION: 'CHECK_SIGN_IN_SESSION',
  TOGGLE_SIGN_IN_DIALOG: 'TOGGLE_SIGN_IN_DIALOG',
  FETCH_CURRENT_EMPLOYEE_START: 'FETCH_CURRENT_EMPLOYEE_START',
  FETCH_CURRENT_EMPLOYEE_SUCCESS: 'FETCH_CURRENT_EMPLOYEE_SUCCESS',
  FETCH_CURRENT_EMPLOYEE_FAILURE: 'FETCH_CURRENT_EMPLOYEE_FAILURE'
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

const signOutStart = () => ({
  type: AuthActionTypes.SIGN_OUT_START
});

const signOutSuccess = () => ({
  type: AuthActionTypes.SIGN_OUT_SUCCESS
});

const signOutFailure = () => ({
  type: AuthActionTypes.SIGN_OUT_START
});

const checkSignInSession = () => ({
  type: AuthActionTypes.CHECK_SIGN_IN_SESSION
});

const toggleSignInDialog = () => ({
  type: AuthActionTypes.TOGGLE_SIGN_IN_DIALOG
});

const fetchCurrentEmployeeStart = (id) => ({
  type: AuthActionTypes.FETCH_CURRENT_EMPLOYEE_START,
  payload: id
});

const fetchCurrentEmployeeSuccess = (employee) => ({
  type: AuthActionTypes.FETCH_CURRENT_EMPLOYEE_SUCCESS,
  payload: employee
});

const fetchCurrentEmployeeFailure = () => ({
  type: AuthActionTypes.FETCH_CURRENT_EMPLOYEE_FAILURE
});

export {
  AuthActionTypes,
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  checkSignInSession,
  toggleSignInDialog,
  fetchCurrentEmployeeStart,
  fetchCurrentEmployeeSuccess,
  fetchCurrentEmployeeFailure
};
