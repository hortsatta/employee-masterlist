import { UserAccountActionTypes } from './user-account.actions';

const INITIAL_STATE = {
  isLoading: false,
  userRoles: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserAccountActionTypes.FETCH_ALL_USER_ROLES_START:
      return {
        ...state,
        isLoading: true
      };
    case UserAccountActionTypes.FETCH_ALL_USER_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userRoles: action.payload
      };
    case UserAccountActionTypes.FETCH_ALL_USER_ROLES_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
