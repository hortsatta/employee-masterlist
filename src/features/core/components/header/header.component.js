import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { H1 } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './header.styles.scss';
import styles from 'common/styles/styles.scss';
import { PAGE_TITLES } from 'config/system.config';
import { selectExpandSideNav, selectDarkMode } from '../../store';

const getPageTitle = (pathname) => {
  if (pathname.includes('update')) {
    switch (true) {
      case pathname.includes('employee'):
        return PAGE_TITLES.updateEmployee;
      default:
        return {};
    }
  }

  switch (pathname) {
    case PAGE_TITLES.employeeList.path:
      return PAGE_TITLES.employeeList;
    case PAGE_TITLES.addEmployee.path:
      return PAGE_TITLES.addEmployee;
    case PAGE_TITLES.options.path:
      return PAGE_TITLES.options;
    default:
      return {};
  }
};

const Header = ({ expandSideNav, darkMode, pageTitle }) => {
  const expandStyle = { paddingLeft: expandSideNav
    ? styles.expandsideNavWidth : styles.sideNavWidth };

  return (
    <header className={`main-header ${darkMode ? 'bp3-dark' : ''}`} style={expandStyle}>
      <Helmet>
        <title>{[pageTitle?.title, PAGE_TITLES.app.title].filter(Boolean).join(' — ')}</title>
      </Helmet>
      <div className='page-title'>
        <H1>{pageTitle?.title}</H1>
        {pageTitle?.subtitle && (<small>{pageTitle?.subtitle}</small>)}
      </div>
    </header>
  );
};

Header.propTypes = {
  expandSideNav: PropTypes.bool,
  darkMode: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  pageTitle: PropTypes.shape()
};

const mapStateToProps = createStructuredSelector({
  expandSideNav: selectExpandSideNav,
  darkMode: selectDarkMode
});

const mergeProps = (stateProps, _, ownProps) => ({
  pageTitle: getPageTitle(ownProps.location.pathname),
  ...stateProps
});

export default compose(
  withRouter,
  connect(mapStateToProps, null, mergeProps)
)(Header);
