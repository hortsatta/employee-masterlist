import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const navigateToEmployeeList = () => history.push('/employees');

const navigateToNewEmployee = () => history.push('/employees/new');

const navigateToUpdateEmployee = (id) => history.push(`/employees/${id}/update`);

export {
  history,
  navigateToEmployeeList,
  navigateToNewEmployee,
  navigateToUpdateEmployee
};
