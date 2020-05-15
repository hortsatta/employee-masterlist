import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const UpsertEmployeePage = lazy(() => import('./upsert-employee-page/upsert-employee-page.component'));
const EmployeeListPage = lazy(() => import('./employee-list-page/employee-list-page.component'));

const EmployeeRoutes = ({ path }) => (
  <>
    <Route exact path={`${path}/new`} component={UpsertEmployeePage} />
    <Route exact path={`${path}`} component={EmployeeListPage} />
  </>
);

EmployeeRoutes.propTypes = {
  path: PropTypes.string.isRequired
};

export default EmployeeRoutes;
