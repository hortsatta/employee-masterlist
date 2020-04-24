import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import './options.styles.scss';
import { selectDarkMode } from 'features/core/store';
import { GeneralOptions } from '../../components';

const OptionsPage = ({ darkMode }) => (
  <div className={`${darkMode ? 'bp3-dark' : ''} options`}>
    <GeneralOptions />
  </div>
);

OptionsPage.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode
});

export default connect(mapStateToProps)(OptionsPage);
