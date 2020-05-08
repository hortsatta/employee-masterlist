import React, { useEffect } from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { fetchAllDepartmentsStart, selectAllDepartments } from 'features/department/store';
import { fetchJobTitlesByDepartmentIdsStart } from 'features/job-title/store';
import EmployeeRoutes from '../employee-routes';

const EmployeePage = ({
  departments,
  fetchAllDepartmentsStartDispatch,
  fetchJobTitlesByDepartmentIdsStartDispatch,
  match
}) => {
  useEffect(() => {
    fetchAllDepartmentsStartDispatch();
  }, [fetchAllDepartmentsStartDispatch]);

  useEffect(() => {
    if (!departments) return;
    const ids = departments.map((department) => department.id);
    fetchJobTitlesByDepartmentIdsStartDispatch(ids);
  }, [departments, fetchJobTitlesByDepartmentIdsStartDispatch]);

  return (
    <div className='employee-page'>
      <Switch>
        <EmployeeRoutes path={match.path} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  departments: selectAllDepartments
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDepartmentsStartDispatch: () => dispatch(fetchAllDepartmentsStart()),
  fetchJobTitlesByDepartmentIdsStartDispatch: (ids) => (
    dispatch(fetchJobTitlesByDepartmentIdsStart(ids)))
});

EmployeePage.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.object),
  fetchAllDepartmentsStartDispatch: PropTypes.func.isRequired,
  fetchJobTitlesByDepartmentIdsStartDispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeePage));