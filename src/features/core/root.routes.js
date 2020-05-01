import { EmployeePage } from 'features/employee/pages';
import OptionsPage from 'features/options/pages';

export default {
  home: {
    path: '/',
    name: 'home',
    exact: true,
    component: null
  },
  employees: {
    path: '/employees',
    name: 'employees',
    component: EmployeePage
  },
  options: {
    path: '/options',
    name: 'options',
    exact: true,
    component: OptionsPage
  }
};
