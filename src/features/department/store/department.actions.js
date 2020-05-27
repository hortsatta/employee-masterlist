const DepartmentActionTypes = {
  FETCH_ALL_DEPARTMENTS_START: 'FETCH_ALL_DEPARTMENTS_START',
  FETCH_ALL_DEPARTMENTS_SUCCESS: 'FETCH_ALL_DEPARTMENTS_SUCCESS',
  FETCH_ALL_DEPARTMENTS_FAILURE: 'FETCH_ALL_DEPARTMENTS_FAILURE'
};

const fetchAllDepartmentsStart = (isActive) => ({
  type: DepartmentActionTypes.FETCH_ALL_DEPARTMENTS_START,
  payload: isActive
});

const fetchAllDepartmentsSuccess = (departments) => ({
  type: DepartmentActionTypes.FETCH_ALL_DEPARTMENTS_SUCCESS,
  payload: departments
});

const fetchAllDepartmentsFailure = () => ({
  type: DepartmentActionTypes.FETCH_ALL_DEPARTMENTS_FAILURE
});

export {
  DepartmentActionTypes,
  fetchAllDepartmentsStart,
  fetchAllDepartmentsSuccess,
  fetchAllDepartmentsFailure
};
