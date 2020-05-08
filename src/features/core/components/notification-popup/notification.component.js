import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Toaster, Position, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import {
  selectCurrentErrorMessage,
  setNotificationError,
  setNotificationSuccess,
  selectCurrentSuccessMessage
} from 'features/core/store';

const NotificationPopup = ({ error, success, dispatch }) => {
  const [toaster, setToaster] = useState(null);

  useEffect(() => {
    if (error === null) { return; }
    toaster && toaster.show({ icon: IconNames.DELETE, message: error, intent: Intent.DANGER });
    dispatch(setNotificationError(null));
  }, [error, toaster, dispatch]);

  useEffect(() => {
    if (success === null) { return; }
    toaster && toaster.show({
      icon: IconNames.TICK, message: success, intent: Intent.SUCCESS });
    dispatch(setNotificationSuccess(null));
  }, [success, toaster, dispatch]);

  return (
    <div>
      <Toaster position={Position.TOP} ref={(el) => (setToaster(el))} />
    </div>
  );
};

NotificationPopup.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  error: selectCurrentErrorMessage,
  success: selectCurrentSuccessMessage
});

export default connect(mapStateToProps)(NotificationPopup);
