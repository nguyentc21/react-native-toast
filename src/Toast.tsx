import EventRegister from './EvenRegister';

import type { ToastItemOptions } from './ToastSection/types';

type ToastItemOptionArgs = [
  ToastItemOptions['content'],
  ToastItemOptions['type']?,
  ToastItemOptions['duration']?
];
type Options = ToastItemOptionArgs | ToastItemOptions;

const argsOptionToOptions = (
  ...args: ToastItemOptionArgs
): ToastItemOptions => ({
  content: args[0],
  type: args[1],
  duration: args[2],
});
class Toast {
  static show(...args: ToastItemOptionArgs | Options[]) {
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
      EventRegister.emit('show-toast', data);
    } catch (error) {}
  }
}

export default Toast;
