import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser
);

const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

const selectShowSignInDialog = createSelector(
  [selectAuth],
  (auth) => auth.showSignInDialog
);

export {
  selectCurrentUser,
  selectIsLoading,
  selectShowSignInDialog
};
