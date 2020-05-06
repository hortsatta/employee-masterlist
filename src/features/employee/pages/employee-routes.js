import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const UpsertEmployeePage = lazy(() => import('./upsert-employee-page/upsert-employee.component'));

const EmployeeRoutes = ({ path }) => (
  <>
    <Route exact path={`${path}`} render={() => (<div>Employees</div>)} />
    <Route exact path={`${path}/new`} component={UpsertEmployeePage} />
  </>
);

EmployeeRoutes.propTypes = {
  path: PropTypes.string.isRequired
};

export default EmployeeRoutes;
