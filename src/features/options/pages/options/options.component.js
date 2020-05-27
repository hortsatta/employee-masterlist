import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Callout } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './options.styles.scss';
import { WithDelay } from 'common/containers';
import { selectDarkMode } from 'features/core/store';
import { GeneralOptions } from '../../components';

const OptionsPage = ({ darkMode }) => (
  <Callout className={`${darkMode ? 'bp3-dark' : ''} options`}>
    <GeneralOptions />
  </Callout>
);

OptionsPage.propTypes = {
  darkMode: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode
});

export default connect(mapStateToProps)(WithDelay(OptionsPage));
