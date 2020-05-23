import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Text } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './text-field.styles.scss';
import { selectDarkMode } from 'features/core/store';
import { connect } from 'react-redux';

const TextField = ({ loading, darkMode, className, label, children }) => (
  <div className={`text-field ${className} ${darkMode ? 'bp3-dark' : ''}`}>
    <Text className={loading ? 'bp3-skeleton' : ''}>{children || 'lorem ipsum'}</Text>
    <small className='label'>{label}</small>
  </div>
);

TextField.propTypes = {
  loading: PropTypes.bool,
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode
});

export default connect(mapStateToProps)(TextField);
