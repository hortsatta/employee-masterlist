import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { selectCurrentUser } from 'features/auth/store';
import EmployeeRoutes from '../employee-routes';

const EmployeePage = ({ currentUser, match }) => (
  <div className='employee-page'>
    <Switch>
      <EmployeeRoutes path={match.path} userRole={currentUser?.userRole} />
    </Switch>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

EmployeePage.propTypes = {
  currentUser: PropTypes.shape(),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default connect(
  mapStateToProps
)(withRouter(EmployeePage));
