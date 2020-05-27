import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormGroup, Switch, Icon, Alignment } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './general-options.styles.scss';
import { toggleDarkMode, selectDarkMode } from 'features/core/store';

const GeneralOptions = ({ darkMode, dispatch }) => (
  <FormGroup className={`${darkMode ? 'bp3-dark' : ''} general-options`}>
    <Switch
      className='night-mode-switch'
      alignIndicator={Alignment.RIGHT}
      checked={darkMode}
      labelElement={(
        <span>
          <Icon icon={IconNames.MOON} />
          <small>Night Mode</small>
        </span>
      )}
      onChange={() => dispatch(toggleDarkMode())}
    />
  </FormGroup>
);

GeneralOptions.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode
});

export default connect(mapStateToProps)(GeneralOptions);
