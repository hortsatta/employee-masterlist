import { createSelector } from 'reselect';

const selectCore = (state) => state.core;

const selectExpandSideNav = createSelector(
  [selectCore],
  (core) => core.expandSideNav
);

const selectDarkMode = createSelector(
  [selectCore],
  (core) => core.darkMode
);

const selectCurrentErrorMessage = createSelector(
  [selectCore],
  (core) => core.error
);

export {
  selectExpandSideNav,
  selectDarkMode,
  selectCurrentErrorMessage
};
