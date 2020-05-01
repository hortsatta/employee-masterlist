import React from 'react';
import { Button, Tooltip } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const IconButton = ({ content, disabled, ...otherProps }) => (
  <Tooltip
    className='icon-button'
    content={content}
    disabled={disabled}
  >
    <Button
      disabled={disabled}
      {...otherProps}
    />
  </Tooltip>
);

IconButton.propTypes = {
  content: PropTypes.string,
  disabled: PropTypes.bool
};

export default IconButton;
