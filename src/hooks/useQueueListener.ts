import { useState, useEffect, useRef } from 'react';

import useStableCallback from '../hooks/useStableCallback';

import EventRegister from '../EvenRegister';
import { EVENT_NAME } from '../constants';
import { generateId } from '../functions';

import type { EventDataType } from '../EvenRegister';
import type { ToastItemOptions } from '../types';

type Props<E extends keyof EventDataType> = {
  action(data: EventDataType[E]): void | Promise<void>;
  reject?(error: any, data: EventDataType[E]): void;
};

type Item = ToastItemOptions & { id: string };

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const useQueueListener = <E extends keyof EventDataType>(props: Props<E>) => {
  const { action, reject } = props;

  const localData = useRef<Item[]>([]);
  const isWaitingRef = useRef(false);

  const [isProcessingState, setIsProcessingState] = useState(false);

  const _action = async (data: EventDataType[E]) => {
    try {
      setIsProcessingState(true);
      action(data);
      await delay(100);
    } catch (error) {
      reject?.(error, data);
    } finally {
      setIsProcessingState(false);
      isWaitingRef.current = false;
    }
  };
  const _preAction = useStableCallback(() => {
    if (!!isWaitingRef.current || localData.current.length <= 0) return;
    isWaitingRef.current = true;
    const _firstItem = localData.current[0];
    localData.current = localData.current.slice(1);
    _action(_firstItem as Item);
  });

  useEffect(() => {
    if (!!isProcessingState) return;
    _preAction();
  }, [isProcessingState]);

  useEffect(() => {
    EventRegister.on(EVENT_NAME, (data) => {
      const _data = Array.isArray(data)
        ? data.map((el) => ({ ...el, id: generateId() }))
        : { ...data, id: generateId() };
      localData.current = localData.current.concat(_data);
      _preAction();
    });
    return () => {
      EventRegister.rm(EVENT_NAME);
    };
  }, [_preAction]);
};

export default useQueueListener;
