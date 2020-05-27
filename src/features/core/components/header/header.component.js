import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { H1, H4 } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './header.styles.scss';
import styles from 'common/styles/styles.scss';
import github from 'assets/github.png'
import githubDark from 'assets/github-dark.png'
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
        <H1 className={Object.keys(pageTitle).length ? '' : 'empty'}>{pageTitle?.title}</H1>
        {pageTitle?.subtitle && (<small>{pageTitle?.subtitle}</small>)}
      </div>
      <a
        className='github-link'
        href='https://github.com/hortsatta/employee-masterlist'
        target='_blank'
        rel="noopener noreferrer" 
      >
        <img src={darkMode ? githubDark : github} alt='github' />
        <div>
            <H4>{process.env.REACT_APP_NAME}</H4>
        </div>
      </a>
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
