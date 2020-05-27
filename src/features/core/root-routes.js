import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { HomePage } from 'features/home/pages';

const EmployeePage = lazy(() => import('features/employee/pages').then(module => ({ default: module.EmployeePage })));
const OptionsPage = lazy(() => import('features/options/pages'));

const RootRoutes = () => (
  <>
    <Route exact path='/' component={HomePage} />
    <Route path='/employees' component={EmployeePage} />
    <Route exact path='/options' component={OptionsPage} />
  </>
);

export default RootRoutes;
