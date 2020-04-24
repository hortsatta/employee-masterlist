import { IconNames } from '@blueprintjs/icons';

const roles = {
  administrator: { id: 2, name: 'Administrator' },
  regular: { id: 1, name: 'Regular' },
  guest: { id: 0, name: 'Guest' }
};

const links = {
  employees: {
    icon: IconNames.PEOPLE,
    text: 'Employees',
    to: '/employees',
    roles: [
      roles.administrator
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
      roles.administrator,
      roles.regular,
      roles.guest
    ]
  }
};

const menuLinks = Object.values(links);

export { roles, links, menuLinks };
