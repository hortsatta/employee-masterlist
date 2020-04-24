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

export {
  selectExpandSideNav,
  selectDarkMode
};
