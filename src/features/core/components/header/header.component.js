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
import { pageTitles } from 'config/system.config';
import { selectExpandSideNav, selectDarkMode } from '../../store';

const getPageTitle = (pathname) => {
  if (pathname.includes('update')) {
    switch (true) {
      case pathname.includes('employee'):
        return pageTitles.updateEmployee;
      default:
        return {};
    }
  }

  switch (pathname) {
    case pageTitles.employeeList.path:
      return pageTitles.employeeList;
    case pageTitles.addEmployee.path:
      return pageTitles.addEmployee;
    case pageTitles.options.path:
      return pageTitles.options;
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
        <title>{[pageTitle?.title, pageTitles.app.title].filter(Boolean).join(' — ')}</title>
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
