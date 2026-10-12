import EventListener from '@nguyentc21/event-listener';

import type { ToastItemOptions } from './types';
import type { EVENT_NAME } from './constants';

type EventDataType = {
  [EVENT_NAME]: ToastItemOptions | ToastItemOptions[];
};

const EventRegister = new EventListener<EventDataType>(
  '@nguyentc21/react-native-toast'
);

export type { EventDataType };
export default EventRegister;
