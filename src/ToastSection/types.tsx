import { Animated } from 'react-native';

import type { ReactNode } from 'react';
import type { ViewStyle, StyleProp, ColorValue, TextStyle } from 'react-native';

export type ToastTypeType =
  | 'standard'
  | 'success'
  | 'danger'
  | 'error'
  | 'warning';

export type PositionType = 'top' | 'bottom';

export interface ColorsType {
  SUCCESS?: {
    backgroundColor: ViewStyle['backgroundColor'];
    textColor: TextStyle['color'];
  };
  DANGER?: {
    backgroundColor: ViewStyle['backgroundColor'];
    textColor: TextStyle['color'];
  };
  WARNING?: {
    backgroundColor: ViewStyle['backgroundColor'];
    textColor: TextStyle['color'];
  };
  STANDARD?: {
    backgroundColor: ViewStyle['backgroundColor'];
    textColor: TextStyle['color'];
  };
}

export interface ToastItemType {
  id: number | string;
  visible: boolean;
  content: string;
  type: ToastTypeType;
  duration: number;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  textStyle?: StyleProp<TextStyle>;
  fadeAnim: Animated.Value;
  AdditionItem?: ReactNode;
}
export type ToastItemOptions = Pick<
  Partial<ToastItemType>,
  | 'content'
  | 'type'
  | 'duration'
  | 'backgroundColor'
  | 'textColor'
  | 'textStyle'
  | 'AdditionItem'
>;

export interface ToastProps {
  wrapStyle?: StyleProp<ViewStyle>;
  toastTextStyle?: StyleProp<TextStyle>;
  toastContainerStyle?: StyleProp<ViewStyle>;
  duration?: number;
  type?: ToastTypeType;
  position?: PositionType;
  colors?: ColorsType;
  holdable?: boolean;
}

export interface ToastRefType {
  show(option: Partial<ToastItemType>): Promise<string>;
}
