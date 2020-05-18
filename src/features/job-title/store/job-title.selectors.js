import { createSelector } from 'reselect';

import { convertMapToObj } from 'common/utils';

const selectJobTitleState = (state) => state.jobTitles;

const selectAllJobTitles = createSelector(
  [selectJobTitleState],
  (jobTitleState) => jobTitleState.jobTitles
);

const selectAllJobTitlesObj = createSelector(
  [selectJobTitleState],
  (jobTitleState) => (
    jobTitleState.jobTitles ? convertMapToObj(jobTitleState.jobTitles, 'id') : {})
);

const selectIsLoading = createSelector(
  [selectJobTitleState],
  (jobTitleState) => jobTitleState.isLoading
);

export {
  selectAllJobTitles,
  selectAllJobTitlesObj,
  selectIsLoading
};
