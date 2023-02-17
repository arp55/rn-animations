import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  block,
  cond,
  eq,
  multiply,
  set,
  useCode,
} from "react-native-reanimated";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
    onGestureEvent,
    translate,
    vec, 
    pinchActive, 
    pinchBegan, 
    timing
} from "react-native-redash/lib/module/v1";
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

const { width, height } = Dimensions.get("window");
const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical:100
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
});

const Pinch= () => {
  const origin = vec.createValue(0, 0);
  const pinch = vec.createValue(0, 0);
  const focal = vec.createValue(0, 0);
  const gestureScale = new Value(1);
  const scale = new Value(1);
  const state = new Value(State.UNDETERMINED);
  const numberOfPointers = new Value(0);
  const pinchGestureHandler = onGestureEvent({
    numberOfPointers,
    scale: gestureScale,
    state,
    focalX: focal.x,
    focalY: focal.y,
  });
  const adjustedFocal = vec.sub(focal, CENTER);
  const translation = vec.createValue(0, 0);
  const zIndex=cond(eq(state,State.ACTIVE),3,1)
  useCode(
    () =>
      block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(pinchActive(state, numberOfPointers), [
          vec.set(pinch, vec.sub(adjustedFocal, origin)),
          vec.set(
            translation,
            vec.add(pinch, vec.multiply(-1, gestureScale))
          ),
        ]),
        cond(eq(state, State.END), [
          set(gestureScale, timing({from:gestureScale,to:1})),
          set(translation.x, timing({from:translation.x,to:1})),
          set(translation.y, timing({from:translation.y,to:1})),
          vec.set(focal, 0),
          vec.set(pinch, 0),
        ]),
        set(scale, gestureScale),
      ]),
    [
      adjustedFocal,
      focal,
      gestureScale,
      numberOfPointers,
      origin,
      pinch,
      scale,
      state,
      translation,
    ]
  );
    return (
        <View style={styles.container}>
            <PostHeader/>
            <PinchGestureHandler {...pinchGestureHandler}>
                <Animated.View style={{width:width,height:width,zIndex}}>
                    <Animated.Image style={[styles.image,{transform: [...translate(translation), { scale }]}]} source={require('./assets/zurich.jpg')}/>
                </Animated.View>
            </PinchGestureHandler>
            <PostFooter/>
        </View>
    )
}

export default Pinch
