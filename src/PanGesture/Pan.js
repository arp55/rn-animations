import React from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  add,
  debug,
  event,
  set,
  useCode,
  Value,
} from 'react-native-reanimated';

export default function Cursor() {
  const translateX = new Value(10);
  const translateY = new Value(0);
  const gestureState = new Value(State.UNDETERMINED);

  const onGestureEvent = event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
          state: gestureState,
        },
      },
    ],
    {useNativeDriver: true},
  );

  useCode(
    () => [
      debug('translateX', translateX),
      set(translateX, add(translateX, 10)),
    ],
    [],
  );

  return (
    <PanGestureHandler
      {...{onGestureEvent}}
      onHandlerStateChange={onGestureEvent}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: 20,
          height: 20,
          borderRadius: 20 / 2,
          backgroundColor: 'red',
          transform: [{translateX}],
        }}
      />
    </PanGestureHandler>
  );
}
