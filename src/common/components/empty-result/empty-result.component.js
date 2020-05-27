import React from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './empty-result.styles.scss';

const EmptyResult = ({ icon, title, description, ...otherProps }) => (
  <NonIdealState
    className='empty-result'
    icon={icon || IconNames.SEARCH}
    title={title || 'No search results'}
    description={description || 'Try searching something else'}
    {...otherProps}
  />
);

EmptyResult.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default EmptyResult;
