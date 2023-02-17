import React from 'react';
import {Dimensions, Text} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

// import {withOffset} from 'react-native-redash';

import Animated, {
  add,
  block,
  cond,
  debug,
  eq,
  event,
  Extrapolate,
  interpolate,
  set,
  useCode,
  useValue,
  Value,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

export const withOffset = (
  value: Animated.Node<number>,
  state: Animated.Node<State>,
  offset: Animated.Value<number> = new Value(0),
) =>
  cond(
    eq(state, State.END),
    [set(offset, add(offset, value)), offset],
    add(offset, value),
  );

export default function Pan() {
  const translationY = new Value(0);
  const offsetY = new Value(0);
  const gestureState = new Value(State.UNDETERMINED);

  const onGestureEvent = event(
    [
      {
        nativeEvent: {
          translationY,
          state: gestureState,
        },
      },
    ],
    {},
  );

  // useCode(
  //   () =>
  //     block([
  //       cond(
  //         eq(gestureState, State.END),
  //         [set(offsetY, translationY)],
  //         cond(
  //           eq(gestureState, State.BEGAN),
  //           [set(translationY, add(offsetY, translationY))],
  //           translationY,
  //         ),
  //       ),
  //     ]),
  //   [],
  // );

  // const translateY = interpolate(translationY, {
  //   inputRange: [0, height - (height * 45) / 100],
  //   outputRange: [0, height - (height * 45) / 100],
  //   extrapolate: Extrapolate.CLAMP,
  // });

  const translateY = cond(
    eq(gestureState, State.END),
    [set(offsetY, add(offsetY, translationY)), offsetY],
    add(offsetY, translationY),
  );

  return (
    <PanGestureHandler
      {...{onGestureEvent}}
      onHandlerStateChange={onGestureEvent}>
      <Animated.View
        style={{
          height: (height * 45) / 100,
          backgroundColor: 'red',
          width: width,
          transform: [{translateY}],
        }}>
        <Text>PanGesture</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}
