import { createSelector } from 'reselect';

const selectAuthState = (state) => state.auth;

const selectCurrentUser = createSelector(
  [selectAuthState],
  (authState) => authState.currentUser
);

const selectCurrentEmployee = createSelector(
  [selectAuthState],
  (authState) => authState.currentEmployee
);

const selectIsLoading = createSelector(
  [selectAuthState],
  (authState) => authState.isLoading
);

const selectIsCurrentEmployeeLoading = createSelector(
  [selectAuthState],
  (authState) => authState.isCurrentEmployeeLoading
);

const selectShowSignInDialog = createSelector(
  [selectAuthState],
  (authState) => authState.showSignInDialog
);

export {
  selectCurrentUser,
  selectCurrentEmployee,
  selectIsLoading,
  selectIsCurrentEmployeeLoading,
  selectShowSignInDialog
};
