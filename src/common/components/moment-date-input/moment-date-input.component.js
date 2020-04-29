import React from 'react';
import { DateInput } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';
import moment from 'moment';

import { InputButton } from 'common/components';

const getMomentFormatter = (format) => ({
  formatDate: (date, locale) => moment(date).locale(locale).format(format),
  parseDate: (str, locale) => moment(str, format).locale(locale).toDate()
});

const calendarButton = (
  <InputButton content='Select Date' icon={IconNames.CALENDAR} />
);

export default (props) => (
  <DateInput
    rightElement={calendarButton}
    {...getMomentFormatter('MM/DD/YYYY')}
    {...props}
  />
);
