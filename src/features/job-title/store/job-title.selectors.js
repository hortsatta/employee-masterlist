import { createSelector } from 'reselect';

const selectJobTitleState = (state) => state.jobTitles;

const selectAllJobTitles = createSelector(
  [selectJobTitleState],
  (jobTitleState) => jobTitleState.jobTitles
);

const selectIsLoading = createSelector(
  [selectJobTitleState],
  (jobTitleState) => jobTitleState.isLoading
);

export {
  selectAllJobTitles,
  selectIsLoading
};
