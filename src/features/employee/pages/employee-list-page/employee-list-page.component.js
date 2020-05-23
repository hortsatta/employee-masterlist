import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { pageKeys } from 'config/system.config';
import { WithDelay } from 'common/containers';
import { selectCurrentPage, selectPageEmployees, fetchInitialPageEmployeesStart } from '../../store';
import { EmployeeListTable, EmployeeViewDrawer } from '../../components';

const EMPLOYEES_PLACEHOLDER = [...Array(7)].map(() => ({
  personalInfo: {
    fullName: 'John Smith',
    gender: 'Male'
  },
  jobTitle: { titleId: 'hWamU8bktOTYu5ZYftt6' },
  department: { departmentId: '96AXvOeRZXkEoDCbuhWq' },
  hireDate: { date: 'Jan 01, 1999' }
}));

const EmployeeListPage = ({
  currentPageIndex,
  employees,
  fetchInitialPageEmployeesStartDispatch
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    if (currentPageIndex === 0 && !employees) {
      fetchInitialPageEmployeesStartDispatch(true);
    }
  }, [currentPageIndex, employees, fetchInitialPageEmployeesStartDispatch]);

  const handleEmployeeView = (id) => {
    setIsDrawerOpen(true);
    setEmployeeId(id);
  };

  return (
    <div className='employee-list-page'>
      <EmployeeListTable
        numRows={employees ? employees.length : EMPLOYEES_PLACEHOLDER.length}
        dataSource={employees || EMPLOYEES_PLACEHOLDER}
        onViewClick={handleEmployeeView}
      />
      <EmployeeViewDrawer
        employeeId={employeeId}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

EmployeeListPage.propTypes = {
  currentPageIndex: PropTypes.number.isRequired,
  employees: PropTypes.arrayOf(PropTypes.object),
  fetchInitialPageEmployeesStartDispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentPage: selectCurrentPage()(state),
  state
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialPageEmployeesStartDispatch: (isActive) => (
    dispatch(fetchInitialPageEmployeesStart(pageKeys.employees.fullName, isActive, 'asc')))
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
