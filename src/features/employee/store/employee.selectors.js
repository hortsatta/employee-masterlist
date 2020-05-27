import { createSelector } from 'reselect';

const selectEmployeeState = (state) => state.employees;

const selectEmployee = createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.employee
);

const selectNewlyHiredEmployee = createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.newlyHiredEmployee
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
  selectNewlyHiredEmployee,
  selectPageEmployees,
  selectCurrentPage,
  selectCurrentPageKey,
  selectIsEmployeeLoading,
  selectIsPageLoading
};
