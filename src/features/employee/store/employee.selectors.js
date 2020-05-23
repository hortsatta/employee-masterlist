import { createSelector } from 'reselect';

const selectEmployeeState = (state) => state.employees;

const selectEmployee = createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.employee
);

const selectPageEmployees = (iPage) => createSelector(
  [selectEmployeeState],
  (employeeState) => (
    employeeState.pageEmployees ? employeeState.pageEmployees[iPage] : null)
);

const selectCurrentPage = () => createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.currentPage
);

const selectCurrentPageKey = createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.currentPagekey
);

const selectIsEmployeeLoading = createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.isEmployeeLoading
);

const selectIsPageLoading = createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.isPageLoading
);

export {
  selectEmployee,
  selectPageEmployees,
  selectCurrentPage,
  selectCurrentPageKey,
  selectIsEmployeeLoading,
  selectIsPageLoading
};
