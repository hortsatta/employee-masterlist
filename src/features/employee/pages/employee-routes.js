import React, { lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CanActivate } from 'common/guards';
import { employees } from 'config';

const UpsertEmployeePage = lazy(() => import('./upsert-employee-page/upsert-employee-page.component'));
const EmployeeListPage = lazy(() => import('./employee-list-page/employee-list-page.component'));

const EmployeeRoutes = ({ path, userRole }) => (
  <>
    <Route exact path={`${path}/new`} render={() => (
        <CanActivate
          userRole={userRole}
          actions={[employees.CREATE]}
          yes={() => <UpsertEmployeePage />}
          no={() => Redirect('/')}
        />
      )}
    />
    <Route exact path={`${path}/:id/update`} render={() => (
        <CanActivate
          userRole={userRole}
          actions={[
            employees.CREATE,
            employees.UPDATE,
            employees.DELETE
          ]}
          yes={() => <UpsertEmployeePage />}
          no={() => Redirect('/')}
        />
      )}
    />
    <Route exact path={`${path}`} render={() => (
        <CanActivate
          userRole={userRole}
          actions={[employees.READ]}
          yes={() => <EmployeeListPage />}
          no={() => Redirect('/')}
        />
      )}
    />
  </>
);

EmployeeRoutes.propTypes = {
  path: PropTypes.string.isRequired
};

export default EmployeeRoutes;
