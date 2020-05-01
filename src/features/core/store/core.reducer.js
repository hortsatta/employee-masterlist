import { CoreActionTypes } from './core.actions';

const INITIAL_STATE = {
  expandSideNav: false,
  error: null,
  darkMode: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CoreActionTypes.TOGGLE_SIDENAV:
      return {
        ...state,
        expandSideNav: !state.expandSideNav
      };
    case CoreActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      };
    case CoreActionTypes.SET_NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
