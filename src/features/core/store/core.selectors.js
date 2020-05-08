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

const selectCurrentSuccessMessage = createSelector(
  [selectCoreState],
  (coreState) => coreState.success
);

export {
  selectExpandSideNav,
  selectDarkMode,
  selectCurrentErrorMessage,
  selectCurrentSuccessMessage
};
