import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import './main-section.styles.scss';
import styles from 'common/styles/styles.scss';
import { selectExpandSideNav, selectDarkMode } from '../../store';

const MainSection = ({ expandSideNav, darkMode, children }) => {
  const expandStyle = { paddingLeft: expandSideNav
    ? styles.expandsideNavWidth : styles.sideNavWidth };

  return (
    <div className={`${darkMode ? 'bp3-dark' : ''} main-content-wrapper`} style={expandStyle}>
      <div className='main-content'>
        {children}
      </div>
    </div>
  );
};

MainSection.propTypes = {
  expandSideNav: PropTypes.bool,
  darkMode: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = createStructuredSelector({
  expandSideNav: selectExpandSideNav,
  darkMode: selectDarkMode
});

export default connect(mapStateToProps)(MainSection);
