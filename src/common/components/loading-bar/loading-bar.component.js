import React from 'react';
import { ProgressBar } from '@blueprintjs/core';

import './loading-bar.styles.scss';

export default (props) => (
  <ProgressBar className='loading-bar' {...props} />
);
