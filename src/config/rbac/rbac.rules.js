import { employees, departments, jobTitles, home, options } from './rbac.types';

export default {
  // Guest
  0: {
    roleName: 'Guest',
    static: [
      home.READ,
      options.READ
    ]
  },
  // Regular
  1: {
    roleName: 'Regular',
    static: [
      home.READ,
      options.READ,
      employees.READ,
      departments.READ,
      jobTitles.READ
    ]
  },
  // Administrator
  2: {
    roleName: 'Administrator',
    static: [
      home.READ,
      options.READ,
      employees.READ,
      employees.CREATE,
      employees.UPDATE,
      employees.DELETE,
      departments.READ,
      departments.CREATE,
      departments.UPDATE,
      departments.DELETE,
      jobTitles.READ,
      jobTitles.CREATE,
      jobTitles.UPDATE,
      jobTitles.DELETE
    ]
  }
};
