import { EVENT_NAME } from './constants';
import EventRegister from './EvenRegister';

import type { ToastItemOptions } from './types';

type ToastItemOptionArgs = [
  ToastItemOptions['content'],
  ToastItemOptions['type']?,
  ToastItemOptions['position']?,
  ToastItemOptions['duration']?
];
type Options = ToastItemOptionArgs | ToastItemOptions;

const argsOptionToOptions = (
  ...args: ToastItemOptionArgs
): ToastItemOptions => ({
  content: args[0],
  type: args[1],
  position: args[2],
  duration: args[3],
});

const Toast = {
  show(...args: ToastItemOptionArgs | Options[]) {
    try {
      let data: ToastItemOptions | ToastItemOptions[] | undefined;
      if (typeof args[0] !== 'object') {
        data = argsOptionToOptions(...(args as ToastItemOptionArgs));
      } else {
        data = (args as Options[]).map((el) => {
          if (Array.isArray(el)) return argsOptionToOptions(...el);
          return el;
        });
      }
      EventRegister.emit(EVENT_NAME, data);
    } catch (error: any) {
      if (__DEV__) console.warn('[Toast.show] failed:', error?.message);
    }
  },
};

export default Toast;
