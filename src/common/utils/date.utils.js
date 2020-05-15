import moment from 'moment';

import { firebase } from 'common/utils';

const getDateFromTimestamp = ({ seconds, nanoseconds }) => (
  moment((new firebase.firestore.Timestamp(seconds, nanoseconds)).toDate())
);

export { getDateFromTimestamp };
