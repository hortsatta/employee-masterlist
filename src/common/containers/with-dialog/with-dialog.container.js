import React from 'react';
import { Dialog } from '@blueprintjs/core';

export default (WrappedComponent) => ({
  className,
  icon,
  title,
  onClose,
  isOpen,
  lazy,
  ...otherProps
}) => (
  <Dialog
    className={`${className}`}
    icon={icon}
    title={title}
    onClose={onClose}
    isOpen={isOpen}
    lazy={lazy}
  >
    <WrappedComponent {...otherProps} />
  </Dialog>
);
