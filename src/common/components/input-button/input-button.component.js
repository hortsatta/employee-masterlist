import React from 'react';
import { Button, Tooltip } from '@blueprintjs/core';

export default ({ content, disabled, ...otherProps }) => (
  <Tooltip content={content} disabled={disabled}>
    <Button
      disabled={disabled}
      minimal
      {...otherProps}
    />
  </Tooltip>
);
