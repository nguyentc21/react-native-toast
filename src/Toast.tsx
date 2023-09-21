import EventRegister from './EvenRegister';

import type { ToastItemOptions } from './ToastSection/types';

class Toast {
  static show(options: ToastItemOptions | ToastItemOptions[]) {
    EventRegister.emit('show-toast', options);
  }
}

export default Toast;
