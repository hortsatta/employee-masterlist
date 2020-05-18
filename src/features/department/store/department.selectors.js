import { createSelector } from 'reselect';
import { convertMapToObj } from 'common/utils';

const selectDepartmentState = (state) => state.departments;

const selectAllDepartments = createSelector(
  [selectDepartmentState],
  (departmentState) => departmentState.departments
);

const selectAllDepartmentsObj = createSelector(
  [selectDepartmentState],
  (departmentState) => (
    departmentState.departments ? convertMapToObj(departmentState.departments, 'id') : {})
);

const selectIsLoading = createSelector(
  [selectDepartmentState],
  (departmentState) => departmentState.isLoading
);

export {
  selectAllDepartments,
  selectAllDepartmentsObj,
  selectIsLoading
};
