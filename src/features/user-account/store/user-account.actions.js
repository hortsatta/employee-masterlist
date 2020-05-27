const UserAccountActionTypes = {
  FETCH_ALL_USER_ROLES_START: 'FETCH_ALL_USER_ROLES_START',
  FETCH_ALL_USER_ROLES_SUCCESS: 'FETCH_ALL_USER_ROLES_SUCCESS',
  FETCH_ALL_USER_ROLES_FAILURE: 'FETCH_ALL_USER_ROLES_FAILURE'
};

const fetchAllUserRolesStart = (isActive) => ({
  type: UserAccountActionTypes.FETCH_ALL_USER_ROLES_START,
  payload: isActive
});

const fetchAllUserRolesSuccess = (userRoles) => ({
  type: UserAccountActionTypes.FETCH_ALL_USER_ROLES_SUCCESS,
  payload: userRoles
});

const fetchAllUserRolesFailure = () => ({
  type: UserAccountActionTypes.FETCH_ALL_USER_ROLES_FAILURE
});

export {
  UserAccountActionTypes,
  fetchAllUserRolesStart,
  fetchAllUserRolesSuccess,
  fetchAllUserRolesFailure
};
