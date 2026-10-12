import type { ColorsData } from './types';

const EVENT_NAME = 'rn-toast-show';

const DEFAULT_DURATION = 3000;

const DEFAULT_TYPE = 'standard';

const DEFAULT_POSITION = 'top';

const DEFAULT_COLORS_DATA: ColorsData = {
  success: {
    backgroundColor: '#16a32a',
    textColor: '#ffffff',
    shadowColor: '#16a32a',
  },
  error: {
    backgroundColor: '#bf1f2d',
    textColor: '#ffffff',
    shadowColor: '#bf1f2d',
  },
  danger: {
    backgroundColor: '#bf1f2d',
    textColor: '#ffffff',
    shadowColor: '#bf1f2d',
  },
  warning: {
    backgroundColor: '#fbb040',
    textColor: '#1a1a1a',
    shadowColor: '#fbb040',
  },
  standard: {
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    shadowColor: '#666666',
  },
};

export {
  DEFAULT_DURATION,
  DEFAULT_TYPE,
  DEFAULT_POSITION,
  DEFAULT_COLORS_DATA,
  EVENT_NAME,
};
