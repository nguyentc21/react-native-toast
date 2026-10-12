import type { ReactNode } from 'react';
import type { ViewProps, TextProps } from 'react-native';

type ToastType = 'standard' | 'success' | 'danger' | 'error' | 'warning';

type Position = 'top' | 'bottom';

type ColorsItemData = {
  backgroundColor: string;
  textColor: string;
  shadowColor: string;
};
type ColorsData = {
  [K in ToastType]: ColorsItemData;
};

type ToastItemUiOptions = {
  type: ToastType;
  duration: number;
  position: Position;
};

type ToastItemStyles = {
  style?: ViewProps['style'];
  textStyle?: TextProps['style'];
};

type ToastItem = {
  id: string;
  content: string;
  renderContent?(): ReactNode;
} & ToastItemUiOptions &
  Partial<ColorsItemData> &
  ToastItemStyles;

type ToastItemOptions = {
  content: string;
  renderContent?(): ReactNode;
} & Partial<ToastItemUiOptions> &
  ToastItemStyles;

type ToastHandler = {
  show(option: Partial<ToastItem>): Promise<string>;
};

type ToastItemProps = {
  style?: ViewProps['style'];
  textStyle?: TextProps['style'];
  onFinish(id: string, position: Position): void;
  data: ToastItem;
  colorsData: ColorsData;
  holdable?: boolean;
  renderToastItem?(
    p: Omit<ToastItemProps, 'onFinish' | 'renderToastItem'>
  ): ReactNode;
};

type ToastSectionProps = {
  style?: ViewProps['style'];
  itemStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  colorsData?: Partial<ColorsData>;
  holdable?: boolean;
  renderToastItem?: ToastItemProps['renderToastItem'];
} & Partial<ToastItemUiOptions>;

export type {
  ToastType,
  ColorsItemData,
  ColorsData,
  Position,
  ToastHandler,
  ToastSectionProps,
  ToastItem,
  ToastItemOptions,
  ToastItemProps,
};
