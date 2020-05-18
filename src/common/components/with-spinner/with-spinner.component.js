import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner, Intent } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './with-spinner.styles.scss';
import styles from 'common/styles/styles.scss';
import { selectExpandSideNav } from 'features/core/store';

const WithSpinner = ({ expandSideNav, size }) => {
  const expandStyle = { paddingLeft: expandSideNav
    ? styles.expandsideNavWidth : styles.sideNavWidth };

  return (
    <div className='with-spinner' style={expandStyle}>
      <Spinner size={size || Spinner.SIZE_LARGE} intent={Intent.PRIMARY} />
    </div>
  );
};

WithSpinner.propTypes = {
  expandSideNav: PropTypes.bool,
  size: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  expandSideNav: selectExpandSideNav
});

export default connect(mapStateToProps)(WithSpinner);
