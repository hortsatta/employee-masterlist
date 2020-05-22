import { IconNames } from '@blueprintjs/icons';

import { employees, options } from './rbac/rbac.types';

const links = {
  employees: {
    icon: IconNames.PEOPLE,
    text: 'Employees',
    to: '/employees',
    rules: [employees.READ],
    children: {
      newEmployee: {
        icon: IconNames.INSERT,
        text: 'Add New Employee',
        to: '/new',
        rules: [employees.CREATE]
      },
      employeeList: {
        icon: IconNames.LIST_DETAIL_VIEW,
        text: 'View Employees',
        rules: [employees.READ]
      }
    }
  },
  spacer: {
    text: 'spacer'
  },
  options: {
    icon: IconNames.SETTINGS,
    text: 'Options',
    to: '/options',
    rules: [options.READ]
  }
};

const pageTitles = {
  app: { path: '/', title: 'Employee Masterlist' },
  options: {
    path: '/options',
    title: 'Options',
    subtitle: 'Modify application settings.'
  },
  addEmployee: {
    path: '/employees/new',
    title: 'New Employee',
    subtitle: 'Add an employee by using the form below.'
  },
  updateEmployee: {
    path: '/employees/:id/update',
    title: 'Update Employee',
    subtitle: 'Modify personal information or update employee role.'
  },
  employeeList: {
    path: '/employees',
    title: 'Employees',
    subtitle: 'List of employees currently working at the company'
  }
};

const PageMode = {
  NEXT: 'next',
  PREVIOUS: 'previous'
};

const pageKeys = {
  employees: {
    fullName: 'pageKey.fullName',
    hireDate: 'pageKey.hireDate'
  }
};

const menuLinks = Object.values(links);

export { links, pageTitles, PageMode, pageKeys, menuLinks };
