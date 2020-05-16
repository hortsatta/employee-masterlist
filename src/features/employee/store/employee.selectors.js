import { createSelector } from 'reselect';

const selectEmployeeState = (state) => state.employees;

const selectEmployee = (id) => createSelector(
  [selectEmployeeState],
  (employeeState) => {
    const { pageEmployees, employee } = employeeState;

    // Return undefined if employee store is emploty
    if (!pageEmployees && !employee) { return undefined; }

    // Find target employee in pageEmployees first to avoid backend query
    // return target employee, if nonexistent, then return employee property
    const pageEmployeesArr = pageEmployees ? Object.values(pageEmployees) : [];
    const targetEmployee = pageEmployeesArr.flat()
      .find((item) => (item.id === id));

    return targetEmployee || employee;
  }
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

const selectIsLoading = createSelector(
  [selectEmployeeState],
  (employeeState) => employeeState.isLoading
);

export {
  selectEmployee,
  selectPageEmployees,
  selectCurrentPage,
  selectCurrentPageKey,
  selectIsLoading
};
