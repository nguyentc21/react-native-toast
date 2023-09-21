import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  Animated,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import EventRegister from '../EvenRegister';
import styles from './styles';
import { getBackgroundColor, getTextColor, generateId } from './functions';

import type {
  ToastItemType,
  ToastItemOptions,
  ToastProps,
  ToastRefType,
} from './types';

const DEFAULT_DURATION = 3000;
const DEFAULT_TYPE = 'standard';
const DEFAULT_POSITION = 'top';
const ToastSection = forwardRef<ToastRefType, ToastProps>(
  (props, forwardedRef) => {
    const {
      wrapStyle,
      toastTextStyle,
      toastContainerStyle,
      duration = DEFAULT_DURATION,
      type = DEFAULT_TYPE,
      position = DEFAULT_POSITION,
      colors,
      holdable = true,
    } = props;

    const timeoutActionIdsRef = useRef<
      Record<ToastItemType['id'], ReturnType<typeof setTimeout>>
    >({});

    const [toastListDataState, setToastListDataState] = useState<
      Record<ToastItemType['id'], ToastItemType>
    >({});

    const { width, height } = useWindowDimensions();

    const extraProps = {
      [position]: height * 0.1,
    };

    useEffect(() => {
      EventRegister.on('show-toast', async (data) => {
        if (Array.isArray(data)) {
          for (const el of data) {
            await _show(el);
          }
        } else {
          _show(data);
        }
      });
      return () => {
        EventRegister.rm('show-toast');
      };
    }, []);

    useEffect(() => {
      const theLastItemKey =
        position === 'top'
          ? Object.keys(toastListDataState).shift()
          : Object.keys(toastListDataState).pop();
      if (!theLastItemKey) return;
      const theLastToastItem = toastListDataState[theLastItemKey];
      if (!!theLastToastItem?.visible) return;
      _showToastItem(theLastItemKey);
    }, [toastListDataState]);

    const _addToastItemToWaitingList = (
      toastItem: Omit<ToastItemType, 'id'>
    ) => {
      return new Promise<string>((resolve) => {
        const id = generateId();
        setToastListDataState((_state) => {
          const _toastItem = { ...toastItem, id };
          if (position === 'top') {
            return {
              [id]: _toastItem,
              ..._state,
            };
          } else {
            return {
              ..._state,
              [id]: _toastItem,
            };
          }
        });
        setTimeout(() => {
          resolve(id);
        }, 100);
      });
    };

    const _clearTimeoutActionByKey = (key: string | number) => {
      const timeoutId = timeoutActionIdsRef.current[key];
      if (timeoutId) {
        clearTimeout(timeoutId);
        delete timeoutActionIdsRef.current[key];
      }
    };

    const _hideToastItem = (key: string | number) => {
      const toastItem = toastListDataState[key];
      if (toastItem == undefined) return;
      Animated.timing(toastItem.fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setToastListDataState((_state) => {
          const { [key]: needDeleteItem, ...newState } = _state;
          return newState;
        });
      });
    };
    const _timeoutHideToastItem = (key: string | number, duration: number) => {
      _clearTimeoutActionByKey(key);
      timeoutActionIdsRef.current[key] = setTimeout(() => {
        _hideToastItem(key);
        delete timeoutActionIdsRef.current[key];
      }, duration);
    };

    const _showToastItem = (key: string | number) => {
      const toastItem = toastListDataState[key];
      if (toastItem == undefined) return;
      Animated.timing(toastItem.fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setToastListDataState((_state) => {
          const _toastItem = _state[key];
          if (!_toastItem) return _state;
          return {
            ..._state,
            [key]: { ..._toastItem, visible: true },
          };
        });
        _timeoutHideToastItem(key, toastItem.duration);
      });
    };

    const _onPressInShowedToastItem = (toastItemData: ToastItemType) => () => {
      _clearTimeoutActionByKey(toastItemData.id);
    };
    const _onPressOutShowedToastItem = (toastItemData: ToastItemType) => () => {
      _timeoutHideToastItem(toastItemData.id, toastItemData.duration);
    };

    const _show = async (option: ToastItemOptions) => {
      const {
        content,
        type: _type,
        duration: _duration,
        AdditionItem,
        backgroundColor,
        textColor,
        textStyle,
      } = option || {};
      const newToastItem: Omit<ToastItemType, 'id'> = {
        visible: false,
        content: !content ? '' : content,
        type: !!_type ? _type : type,
        duration: !!_duration ? _duration : duration,
        backgroundColor,
        textColor,
        textStyle,
        AdditionItem,
        fadeAnim: new Animated.Value(0),
      };
      return await _addToastItemToWaitingList(newToastItem);
    };

    useImperativeHandle(forwardedRef, () => ({
      show: _show,
    }));

    const _renderToastList = (
      toastList: Record<ToastItemType['id'], ToastItemType>
    ) => {
      let result = [],
        index = 0;
      for (const key in toastList) {
        result[index++] = _renderToast(toastListDataState[key]);
      }
      return result;
    };

    const _renderToast = (toastItemData?: ToastItemType) => {
      if (!toastItemData) return null;
      const {
        id,
        fadeAnim,
        content,
        type: _type,
        AdditionItem,
        backgroundColor,
        textColor,
        textStyle,
      } = toastItemData;
      const _backgroundColor = !!backgroundColor
        ? backgroundColor
        : getBackgroundColor(_type, colors);
      const _textColor = !!textColor ? textColor : getTextColor(_type, colors);
      return (
        <Animated.View
          key={id}
          style={{
            marginTop: 10,
            opacity: fadeAnim,
          }}
        >
          <Pressable
            style={[
              styles.shadow24,
              toastContainerStyle,
              {
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 8,
                maxWidth: width * 0.9,
                backgroundColor: _backgroundColor,
              },
            ]}
            pressRetentionOffset={{ bottom: 50, top: 50 }}
            disabled={!holdable}
            onPressIn={_onPressInShowedToastItem(toastItemData)}
            onPressOut={_onPressOutShowedToastItem(toastItemData)}
          >
            {AdditionItem}
            <Text
              style={[
                styles.text,
                { textAlign: 'center', fontWeight: 'bold', fontSize: 15 },
                toastTextStyle,
                textStyle,
                { color: _textColor },
              ]}
              selectable
            >
              {content}
            </Text>
          </Pressable>
        </Animated.View>
      );
    };

    if (
      toastListDataState == undefined ||
      Object.keys(toastListDataState).length === 0
    )
      return null;

    return (
      <View
        style={[
          {
            backgroundColor: 'transparent',
            position: 'absolute',
            alignSelf: 'center',
          },
          extraProps,
          wrapStyle,
        ]}
      >
        {_renderToastList(toastListDataState)}
      </View>
    );
  }
);

export default ToastSection;
