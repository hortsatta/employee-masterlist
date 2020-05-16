import { IconNames } from '@blueprintjs/icons';

const ROLES = {
  administrator: { id: 2, name: 'Administrator' },
  regular: { id: 1, name: 'Regular' },
  guest: { id: 0, name: 'Guest' }
};

const LINKS = {
  employees: {
    icon: IconNames.PEOPLE,
    text: 'Employees',
    to: '/employees',
    roles: [
      ROLES.administrator
    ],
    children: {
      newEmployee: {
        icon: IconNames.INSERT,
        text: 'Add New Employee',
        to: '/new'
      },
      employeeList: {
        icon: IconNames.LIST_DETAIL_VIEW,
        text: 'View Employees'
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
    roles: [
      ROLES.administrator,
      ROLES.regular,
      ROLES.guest
    ]
  }
};

const PAGE_TITLES = {
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
  editEmployee: {
    path: '/employees/:id/edit',
    title: 'Edit Employee',
    subtitle: 'Update employee information.'
  },
  employeeList: {
    path: '/employees',
    title: 'Employees',
    subtitle: 'List of employees currently working at the company'
  }
};

const PAGE_MODE = {
  next: 'next',
  previous: 'previous'
};

const PAGE_KEYS = {
  employees: {
    fullName: 'pageKey.fullName',
    hireDate: 'pageKey.hireDate'
  }
};

const menuLinks = Object.values(LINKS);

export { ROLES, LINKS, PAGE_TITLES, PAGE_MODE, PAGE_KEYS, menuLinks };
