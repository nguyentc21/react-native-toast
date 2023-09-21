import EventListener from '@nguyentc21/event-listener';

import type { ToastItemOptions } from './ToastSection/types';

export interface EventDataType {
  'show-toast': ToastItemOptions | ToastItemOptions[];
}

const EventRegister = new EventListener<EventDataType>();

export default EventRegister;
