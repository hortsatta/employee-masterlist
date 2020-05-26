import React from 'react';
import { Button, Tooltip } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const IconButton = ({
  className,
  popoverClassName,
  content,
  contentIntent,
  disabled,
  ...otherProps
}) => (
  <Tooltip
    className={`icon-button ${className}`}
    popoverClassName={`icon-tooltip ${popoverClassName}`}
    content={content}
    intent={contentIntent}
    disabled={disabled}
  >
    <Button
      disabled={disabled}
      {...otherProps}
    />
  </Tooltip>
);

IconButton.propTypes = {
  className: PropTypes.string,
  popoverClassName: PropTypes.string,
  content: PropTypes.string,
  contentIntent: PropTypes.string,
  disabled: PropTypes.bool
};

export default IconButton;
