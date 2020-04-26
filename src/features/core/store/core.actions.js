const CoreActionTypes = {
  TOGGLE_SIDENAV: 'TOGGLE_SIDENAV',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  STATE_ERROR: 'STATE_ERROR'
};

const toggleSideNav = () => ({
  type: CoreActionTypes.TOGGLE_SIDENAV
});

const toggleDarkMode = () => ({
  type: CoreActionTypes.TOGGLE_DARK_MODE
});

const stateError = (errorMessage) => ({
  type: CoreActionTypes.STATE_ERROR,
  payload: errorMessage
});

export {
  CoreActionTypes,
  toggleSideNav,
  toggleDarkMode,
  stateError
};
