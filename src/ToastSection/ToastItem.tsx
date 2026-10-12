import React, { useEffect, useRef } from 'react';
import {
  Animated,
  useAnimatedValue,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import useStableCallback from '../hooks/useStableCallback';

import type { ToastItemProps } from '../types';

function ToastItem(props: ToastItemProps) {
  const {
    style,
    textStyle,
    data,
    colorsData,
    holdable,
    onFinish,
    renderToastItem,
  } = props;

  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>();
  const fadeAnim = useAnimatedValue(0);

  const {
    id,
    content,
    type,
    duration,
    position,
    backgroundColor,
    textColor,
    shadowColor,
    style: _style,
    textStyle: _textStyle,
    renderContent,
  } = data;

  const _colorData = colorsData[type] ?? colorsData.standard;
  const _backgroundColor = backgroundColor ?? _colorData.backgroundColor;
  const _textColor = textColor ?? _colorData.textColor;
  const _shadowColor = shadowColor ?? _colorData.shadowColor;

  const _onFinish = useStableCallback(onFinish);

  const _clearTimeout = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const _hide = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      _onFinish(id, position);
    });
  };

  const _hideWithTimeOut = () => {
    _clearTimeout();
    timeoutId.current = setTimeout(() => {
      _hide();
    }, duration);
  };

  const _show = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      _hideWithTimeOut();
    });
  };

  const _renderContent = () => {
    if (renderContent) return renderContent();
    if (renderToastItem)
      return renderToastItem({
        style,
        textStyle,
        data,
        colorsData,
        holdable,
      });
    return (
      <Pressable
        style={[
          lStyles.shadow15,
          lStyles.pressable,
          { backgroundColor: _backgroundColor, shadowColor: _shadowColor },
          style,
          _style,
        ]}
        pressRetentionOffset={{ bottom: 50, top: 50 }}
        disabled={!holdable}
        onPressIn={() => {
          _clearTimeout();
        }}
        onPressOut={() => {
          _hideWithTimeOut();
        }}
      >
        <Text
          maxFontSizeMultiplier={1.2}
          style={[lStyles.text, { color: _textColor }, textStyle, _textStyle]}
          selectable
        >
          {content}
        </Text>
      </Pressable>
    );
  };

  useEffect(() => {
    _show();
    return () => {
      _clearTimeout();
    };
  }, []);

  return (
    <Animated.View style={[lStyles.wrapper, { opacity: fadeAnim }]}>
      {_renderContent()}
    </Animated.View>
  );
}

const lStyles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
  },
  shadow15: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  pressable: {
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default ToastItem;
