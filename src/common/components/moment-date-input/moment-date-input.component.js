import React, { useRef } from 'react';
import { DateInput } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';
import moment from 'moment';
import PropTypes from 'prop-types';

import { IconButton } from 'common/components';

const getMomentFormatter = (format) => ({
  formatDate: (date, locale) => moment(date).locale(locale).format(format),
  parseDate: (str, locale) => moment(str, format).locale(locale).toDate()
});

const MomentDateInput = (props) => {
  const dateInputEl = useRef(null);

  const calendarButton = (
    <IconButton
      minimal
      content='Select Date'
      icon={IconNames.CALENDAR}
      onClick={() => dateInputEl.current.inputEl.focus()}
    />
  );

  return (
    <DateInput
      minDate={new Date(1900, 1, 1)}
      ref={dateInputEl}
      rightElement={calendarButton}
      {...getMomentFormatter('MM/DD/YYYY')}
      {...props}
    />
  );
};

MomentDateInput.propTypes = {
  required: PropTypes.bool
};

export default MomentDateInput;
