import { createSelector } from 'reselect';

const selectCoreState = (state) => state.core;

const selectExpandSideNav = createSelector(
  [selectCoreState],
  (coreState) => coreState.expandSideNav
);

const selectDarkMode = createSelector(
  [selectCoreState],
  (coreState) => coreState.darkMode
);

const selectCurrentErrorMessage = createSelector(
  [selectCoreState],
  (coreState) => coreState.error
);

export {
  selectExpandSideNav,
  selectDarkMode,
  selectCurrentErrorMessage
};
