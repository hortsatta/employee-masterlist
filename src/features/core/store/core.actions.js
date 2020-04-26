const CoreActionTypes = {
  TOGGLE_SIDENAV: 'TOGGLE_SIDENAV',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_NOTIFICATION_ERROR: 'SET_NOTIFICATION_ERROR'
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

export {
  CoreActionTypes,
  toggleSideNav,
  toggleDarkMode,
  setNotificationError
};
