import { createSelector } from 'reselect';

import { convertMapToObj } from 'common/utils';

const selectUserAccountState = (state) => state.users;

const selectAllUserRoles = createSelector(
  [selectUserAccountState],
  (userAccountState) => userAccountState.userRoles
);

const selectAllUserRolesObj = createSelector(
  [selectUserAccountState],
  (userAccountState) => (
    userAccountState.userRoles ? convertMapToObj(userAccountState.userRoles, 'value') : {})
);

const selectIsLoading = createSelector(
  [selectUserAccountState],
  (userAccountState) => userAccountState.isLoading
);

export {
  selectAllUserRoles,
  selectAllUserRolesObj,
  selectIsLoading
};
