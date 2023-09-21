import type { ColorValue } from 'react-native';
import type { ToastTypeType, ColorsType } from './types';

export const DEFAULT_COLORS = {
  SUCCESS: {
    backgroundColor: '#0b9443',
    textColor: '#ffffff',
  },
  DANGER: {
    backgroundColor: '#bf1f2d',
    textColor: '#ffffff',
  },
  WARNING: {
    backgroundColor: '#fbb040',
    textColor: '#ffffff',
  },
  STANDARD: {
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
  },
};

export const generateId = () => {
  return `${Date.now().valueOf()}_${Math.random()}`;
};

export const getBackgroundColor = (
  type: ToastTypeType,
  colors: ColorsType | undefined
): ColorValue | undefined => {
  switch (type) {
    case 'success':
      return (
        colors?.SUCCESS?.backgroundColor ||
        DEFAULT_COLORS.SUCCESS.backgroundColor
      );
    case 'error':
    case 'danger':
      return (
        colors?.DANGER?.backgroundColor || DEFAULT_COLORS.DANGER.backgroundColor
      );
    case 'warning':
      return (
        colors?.WARNING?.backgroundColor ||
        DEFAULT_COLORS.WARNING.backgroundColor
      );
    default:
      return (
        colors?.STANDARD?.backgroundColor ||
        DEFAULT_COLORS.STANDARD.backgroundColor
      );
  }
};

export const getTextColor = (
  type: ToastTypeType,
  colors: ColorsType | undefined
): ColorValue | undefined => {
  switch (type) {
    case 'success':
      return colors?.SUCCESS?.textColor || DEFAULT_COLORS.SUCCESS.textColor;
    case 'error':
    case 'danger':
      return colors?.DANGER?.textColor || DEFAULT_COLORS.DANGER.textColor;
    case 'warning':
      return colors?.WARNING?.textColor || DEFAULT_COLORS.WARNING.textColor;
    default:
      return colors?.STANDARD?.textColor || DEFAULT_COLORS.STANDARD.textColor;
  }
};
