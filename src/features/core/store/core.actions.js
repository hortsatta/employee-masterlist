const CoreActionTypes = {
  TOGGLE_SIDENAV: 'TOGGLE_SIDENAV',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_NOTIFICATION_ERROR: 'SET_NOTIFICATION_ERROR',
  SET_NOTIFICATION_SUCCESS: 'SET_NOTIFICATION_SUCCESS'
};

const toggleSideNav = () => ({
  type: CoreActionTypes.TOGGLE_SIDENAV
});

const toggleDarkMode = () => ({
  type: CoreActionTypes.TOGGLE_DARK_MODE
});

const setNotificationError = (errorMessage) => ({
  type: CoreActionTypes.SET_NOTIFICATION_ERROR,
  payload: errorMessage
});

const setNotificationSuccess = (successMessage) => ({
  type: CoreActionTypes.SET_NOTIFICATION_SUCCESS,
  payload: successMessage
});

export {
  CoreActionTypes,
  toggleSideNav,
  toggleDarkMode,
  setNotificationError,
  setNotificationSuccess
};
