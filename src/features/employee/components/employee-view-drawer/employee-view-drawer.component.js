import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Drawer, Callout } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './employee-view-drawer.styles.scss';
import { selectDarkMode } from 'features/core/store';
import { selectEmployee, fetchEmployeeStart } from 'features/employee/store';
import PersonalInfoView from '../personal-info-view/personal-info-view.component';

const EmployeeViewDrawer = ({
  darkMode,
  employeeId,
  employee,
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
        <PersonalInfoView employee={employee} />
      </Callout>
    </Drawer>
  );
};

EmployeeViewDrawer.propTypes = {
  darkMode: PropTypes.bool,
  employeeId: PropTypes.string.isRequired,
  employee: PropTypes.shape(),
  fetchEmployeeStartDispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode,
  employee: selectEmployee
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeStartDispatch: (id) => dispatch(fetchEmployeeStart(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeViewDrawer);
