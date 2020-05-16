import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { WithDelay } from 'common/containers';
import { selectCurrentPage, selectPageEmployees, fetchInitialPageEmployeesStart } from '../../store';
import { EmployeeListTable } from '../../components';

const EMPLOYEES_PLACEHOLDER = [...Array(7)].map(() => ({
  personalInfo: {
    fullName: 'John Smith',
    gender: 'Male'
  },
  jobTitle: { name: 'Accounting' },
  department: { alias: 'Accounting and Finance' },
  hireDate: { date: 'Jan 01, 1999' }
}));

const EmployeeListPage = ({ currentPageIndex, employees, fetchInitialPageEmployeesStartDispatch }) => {
  useEffect(() => {
    if (currentPageIndex === 0 && !employees) {
      fetchInitialPageEmployeesStartDispatch(true);
    }
  }, [currentPageIndex, employees, fetchInitialPageEmployeesStartDispatch]);

  return (
    <div className='employee-list-page'>
      <EmployeeListTable
        numRows={employees ? employees.length : EMPLOYEES_PLACEHOLDER.length}
        dataSource={employees || EMPLOYEES_PLACEHOLDER}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentPage: selectCurrentPage()(state),
  state
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialPageEmployeesStartDispatch: (isActive) => (
    dispatch(fetchInitialPageEmployeesStart(isActive, 'asc')))
});

const mergeProps = ({ state, currentPage }, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  currentPageIndex: currentPage.index,
  employees: selectPageEmployees(currentPage.index)(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WithDelay(EmployeeListPage));