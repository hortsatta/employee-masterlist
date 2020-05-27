import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { WithDelay, WithProcessing } from 'common/containers';
import { WithSpinner } from 'common/components';
import { selectIsLoading as selectIsDepartmentLoading } from 'features/department/store';
import { selectIsLoading as selectIsJobTitleLoading } from 'features/job-title/store';
import { selectEmployee, fetchEmployeeStart, selectIsEmployeeLoading } from '../../store';
import { UpserEmployeeForm } from '../../components';

const UpsertEmployeePage = ({
  match,
  employee,
  isDepartmentLoading,
  isJobTitleLoading,
  isEmployeeLoading,
  fetchEmployeeStartDispatch,
  ...otherProps
}) => {
  const { id: employeeId } = match.params;

  // For updating employee
  useEffect(() => {
    if (!employeeId) { return; }
    if (!employee || employee.id !== employeeId) { fetchEmployeeStartDispatch(employeeId); }
  }, [employeeId, employee, fetchEmployeeStartDispatch]);

  return isDepartmentLoading || isJobTitleLoading || isEmployeeLoading
    ? (<WithSpinner />)
    : (<UpserEmployeeForm isUpdate={!!employeeId} employee={employee} {...otherProps} />);
};

UpsertEmployeePage.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }),
  employee: PropTypes.shape({ id: PropTypes.string }),
  isDepartmentLoading: PropTypes.bool,
  isJobTitleLoading: PropTypes.bool,
  isEmployeeLoading: PropTypes.bool,
  fetchEmployeeStartDispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  employee: selectEmployee,
  isDepartmentLoading: selectIsDepartmentLoading,
  isJobTitleLoading: selectIsJobTitleLoading,
  isEmployeeLoading: selectIsEmployeeLoading
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeStartDispatch: (id) => dispatch(fetchEmployeeStart(id))
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  WithDelay,
  WithProcessing
)(UpsertEmployeePage);
