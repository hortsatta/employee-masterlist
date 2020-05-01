import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Toaster, Position, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import { selectCurrentErrorMessage, setNotificationError } from 'features/core/store';

const NotificationPopup = ({ error, dispatch }) => {
  const [toaster, setToaster] = useState(null);

  useEffect(() => {
    if (error === null) { return; }
    toaster && toaster.show({ icon: IconNames.DELETE, message: error, intent: Intent.DANGER });
    dispatch(setNotificationError(null));
  }, [error, toaster, dispatch]);

  return (
    <div>
      <Toaster position={Position.BOTTOM} ref={(el) => (setToaster(el))} />
    </div>
  );
};

NotificationPopup.propTypes = {
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  error: selectCurrentErrorMessage
});

export default connect(mapStateToProps)(NotificationPopup);
