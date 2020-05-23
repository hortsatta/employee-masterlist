import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Drawer, Callout, Divider, Spinner } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './employee-view-drawer.styles.scss';
import { selectDarkMode } from 'features/core/store';
import { selectAllDepartmentsObj, selectIsLoading as selectIsDepartmentLoading } from 'features/department/store';
import { selectAllJobTitlesObj, selectIsLoading as selectIsJobtitleLoading } from 'features/job-title/store';
import { selectEmployee, fetchEmployeeStart, selectIsEmployeeLoading } from '../../store';
import PersonalInfoView from '../personal-info-view/personal-info-view.component';
import EmployeeInfoView from '../employee-info-view/employee-info-view.component';

const EmployeeViewDrawer = ({
  darkMode,
  employeeId,
  employee,
  departments,
  jobTitles,
  isEmployeeLoading,
  isDepartmentLoading,
  isJobTitleLoading,
  fetchEmployeeStartDispatch,
  ...otherProps
}) => {
  useEffect(() => {
    employeeId && fetchEmployeeStartDispatch(employeeId);
  }, [employeeId, fetchEmployeeStartDispatch]);

  return (
    <Drawer
      className={`employee-view-drawer ${darkMode ? 'bp3-dark' : ''}`}
      size={Drawer.SIZE_SMALL}
      hasBackdrop={false}
      {...otherProps}
    >
      <Callout>
        <PersonalInfoView
          isLoading={isEmployeeLoading || isDepartmentLoading || isJobTitleLoading}
          employee={employee}
        />
        <Divider />
        <EmployeeInfoView
          isLoading={isEmployeeLoading || isDepartmentLoading || isJobTitleLoading}
          employee={employee}
          departments={departments}
          jobTitles={jobTitles}
        />
      </Callout>
    </Drawer>
  );
};

EmployeeViewDrawer.propTypes = {
  darkMode: PropTypes.bool,
  employeeId: PropTypes.string.isRequired,
  employee: PropTypes.shape(),
  departments: PropTypes.shape(),
  jobTitles: PropTypes.shape(),
  isEmployeeLoading: PropTypes.bool,
  isDepartmentLoading: PropTypes.bool,
  isJobTitleLoading: PropTypes.bool,
  fetchEmployeeStartDispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode,
  employee: selectEmployee,
  departments: selectAllDepartmentsObj,
  jobTitles: selectAllJobTitlesObj,
  isEmployeeLoading: selectIsEmployeeLoading,
  isDepartmentLoading: selectIsDepartmentLoading,
  isJobTitleLoading: selectIsJobtitleLoading
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeStartDispatch: (id) => dispatch(fetchEmployeeStart(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeViewDrawer);
