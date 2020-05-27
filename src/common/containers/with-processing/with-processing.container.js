import React, { useState } from 'react';

export default (WrappedComponent) => (props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const doProcess = () => {
    setIsProcessing(true);
    const delay = setTimeout(() => {
      setIsProcessing(false);
      clearTimeout(delay);
    }, 500);
  };

  return (
    <WrappedComponent
      isProcessing={isProcessing}
      doProcess={doProcess}
      {...props}
    />
  );
};
