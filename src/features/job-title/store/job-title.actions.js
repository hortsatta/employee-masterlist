const JobTitleActionTypes = {
  FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_START: 'FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_START',
  FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_SUCCESS: 'FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_SUCCESS',
  FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_FAILURE: 'FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_FAILURE'
};

const fetchJobTitlesByDepartmentIdsStart = (ids, isActive = true) => ({
  type: JobTitleActionTypes.FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_START,
  payload: { ids, isActive }
});

const fetchJobTitlesByDepartmentIdsSuccess = (jobTitles) => ({
  type: JobTitleActionTypes.FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_SUCCESS,
  payload: jobTitles
});

const fetchJobTitlesByDepartmentIdsFailure = () => ({
  type: JobTitleActionTypes.FETCH_JOB_TITLES_BY_DEPARTMENT_IDS_FAILURE
});

export {
  JobTitleActionTypes,
  fetchJobTitlesByDepartmentIdsStart,
  fetchJobTitlesByDepartmentIdsSuccess,
  fetchJobTitlesByDepartmentIdsFailure
};
