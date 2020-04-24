const CoreActionTypes = {
  TOGGLE_SIDENAV: 'TOGGLE_SIDENAV',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE'
};

const toggleSideNav = () => ({
  type: CoreActionTypes.TOGGLE_SIDENAV
});

const toggleDarkMode = () => ({
  type: CoreActionTypes.TOGGLE_DARK_MODE
});

export {
  CoreActionTypes,
  toggleSideNav,
  toggleDarkMode
};
