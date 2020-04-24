import { CoreActionTypes } from './core.actions';

const INITIAL_STATE = {
  expandSideNav: false,
  darkMode: false
};

const coreReducer = (state = INITIAL_STATE, action) => {
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
    default:
      return state;
  }
};

export default coreReducer;
