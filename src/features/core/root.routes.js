import OptionsPage from 'features/options/pages';

export default {
  home: {
    path: '/',
    name: 'home',
    exact: true,
    component: null
  },
  options: {
    path: '/options',
    name: 'options',
    exact: true,
    component: OptionsPage
  }
};
