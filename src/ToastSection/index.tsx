import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ToastItem from './ToastItem';

import useQueueListener from '../hooks/useQueueListener';

import {
  DEFAULT_DURATION,
  DEFAULT_POSITION,
  DEFAULT_TYPE,
  DEFAULT_COLORS_DATA,
} from '../constants';

import type {
  ToastItem as ToastItemT,
  ToastItemOptions,
  ToastSectionProps,
} from '../types';

function ToastSection(props: ToastSectionProps) {
  const {
    style,
    itemStyle,
    textStyle,
    duration = DEFAULT_DURATION,
    type = DEFAULT_TYPE,
    position = DEFAULT_POSITION,
    holdable = true,
    colorsData,
    renderToastItem,
  } = props;

  const _colorsData = { ...DEFAULT_COLORS_DATA, ...colorsData };

  const [toastTopListState, setToastTopListState] = useState<ToastItemT[]>([]);
  const [toastBottomListState, setToastBottomListState] = useState<
    ToastItemT[]
  >([]);

  const _addToastItemData = (data: ToastItemOptions & { id: string }) => {
    const _data: ToastItemT = {
      ...data,
      type: data.type ?? type,
      duration: data.duration ?? duration,
      position: data.position ?? position,
    };
    const _setState =
      _data.position === 'top' ? setToastTopListState : setToastBottomListState;
    _setState((_p) => (_p || []).concat(_data));
  };

  const _onItemFinished = (
    id: string,
    position: ToastSectionProps['position']
  ) => {
    const _setState =
      position === 'top' ? setToastTopListState : setToastBottomListState;
    _setState((_prev) => _prev?.filter((el) => el.id !== id));
  };

  const _renderToastItem = (item: ToastItemT) => {
    return (
      <ToastItem
        key={item.id}
        data={item}
        onFinish={_onItemFinished}
        colorsData={_colorsData}
        holdable={holdable}
        style={itemStyle}
        textStyle={textStyle}
        renderToastItem={renderToastItem}
      />
    );
  };

  useQueueListener({
    action: _addToastItemData,
  });

  return (
    <>
      {toastTopListState.length >= 1 && (
        <View style={[lStyles.container, lStyles.topContainer, style]}>
          {toastTopListState.map(_renderToastItem)}
        </View>
      )}
      {toastBottomListState.length >= 1 && (
        <View style={[lStyles.container, lStyles.bottomContainer, style]}>
          {toastBottomListState.map(_renderToastItem)}
        </View>
      )}
    </>
  );
}

const lStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    maxWidth: '90%',
  },
  topContainer: {
    top: '10%',
  },
  bottomContainer: {
    bottom: '10%',
  },
});

export default ToastSection;
