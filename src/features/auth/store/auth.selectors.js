import { createSelector } from 'reselect';

const selectAuthState = (state) => state.auth;

const selectCurrentUser = createSelector(
  [selectAuthState],
  (authState) => authState.currentUser
);

const selectIsLoading = createSelector(
  [selectAuthState],
  (authState) => authState.isLoading
);

const selectShowSignInDialog = createSelector(
  [selectAuthState],
  (authState) => authState.showSignInDialog
);

export {
  selectCurrentUser,
  selectIsLoading,
  selectShowSignInDialog
};
