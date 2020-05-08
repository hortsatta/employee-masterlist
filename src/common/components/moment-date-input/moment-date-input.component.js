import React from 'react';
import { DateInput } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';
import moment from 'moment';
import PropTypes from 'prop-types';

import { IconButton } from 'common/components';

const getMomentFormatter = (format) => ({
  formatDate: (date, locale) => moment(date).locale(locale).format(format),
  parseDate: (str, locale) => moment(str, format).locale(locale).toDate()
});

const calendarButton = (
  <IconButton minimal content='Select Date' icon={IconNames.CALENDAR} />
);

const MomentDateInput = (props) => (
  <DateInput
    rightElement={calendarButton}
    {...getMomentFormatter('MM/DD/YYYY')}
    {...props}
  />
);

MomentDateInput.propTypes = {
  required: PropTypes.bool
};

export default MomentDateInput;
