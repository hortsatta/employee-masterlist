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

const MomentDateInput = ({ required, ...otherProps }) => (
  <DateInput
    rightElement={calendarButton}
    inputProps={{ required }}
    {...getMomentFormatter('MM/DD/YYYY')}
    {...otherProps}
  />
);

MomentDateInput.propTypes = {
  required: PropTypes.bool
};

export default MomentDateInput;
