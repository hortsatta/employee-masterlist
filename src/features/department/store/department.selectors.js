import { createSelector } from 'reselect';

const selectDepartmentState = (state) => state.departments;

const selectAllDepartments = createSelector(
  [selectDepartmentState],
  (departmentState) => departmentState.departments
);

const selectIsLoading = createSelector(
  [selectDepartmentState],
  (departmentState) => departmentState.isLoading
);

export {
  selectAllDepartments,
  selectIsLoading
};
