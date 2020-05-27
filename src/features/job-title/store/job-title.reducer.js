import { JobTitleActionTypes } from './job-title.actions';

const INITIAL_STATE = {
  isLoading: false,
  jobTitles: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JobTitleActionTypes.FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_START:
      return {
        ...state,
        isLoading: true
      };
    case JobTitleActionTypes.FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobTitles: action.payload
      };
    case JobTitleActionTypes.FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
