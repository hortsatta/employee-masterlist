import React, { useState, useEffect } from 'react';
import { Intent } from '@blueprintjs/core';

import { LoadingBar } from 'common/components';

export default (WrappedComponent) => (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const delay = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(delay);
  }, []);

  return isLoading ? (<LoadingBar intent={Intent.PRIMARY} />)
    : (<WrappedComponent {...props} />);
};
