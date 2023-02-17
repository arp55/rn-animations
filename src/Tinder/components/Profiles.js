// @flow
import * as React from "react";
import {
  Dimensions,
  SafeAreaView, StyleSheet, View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import type { Profile } from "./Profile";
import Card from "./Card";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Value,event, interpolate, concat, Extrapolate, cond, eq, set, clockRunning, stopClock, startClock, Clock, and, greaterThan, lessThan, spring, neq, call, add, multiply } from "react-native-reanimated";

type ProfilesProps = {
  profiles: Profile[],
};

type ProfilesState = {
  profiles: Profile[],
};


function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };
  
  // const config = {
  //   damping: 7,
  //   mass: 1,
  //   stiffness: 121.6,
  //   overshootClamping: false,
  //   restSpeedThreshold: 0.001,
  //   restDisplacementThreshold: 0.001,
  //   toValue: new Value(0),
  // };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}


const { width, height } = Dimensions.get("window");
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth = width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

export default class Profiles extends React.PureComponent<ProfilesProps, ProfilesState> {
  constructor(props: ProfilesProps) {
    super(props);
    const { profiles } = props;
    this.state = { profiles };
    this.translationX=new Value(0)
    this.translationY=new Value(0)
    this.velocityX=new Value(0)
    this.velocityY=new Value(0)
    this.offsetY = new Value(0);
    this.offsetX = new Value(0);
    this.gestureState=new Value(State.UNDETERMINED)

    this.onGestureEvent = event(
      [
        { 
          nativeEvent: { 
            translationX:this.translationX,
            translationY:this.translationY,
            velocityX:this.velocityX,
            state:this.gestureState
          },
        },
      ], 
      { useNativeDriver: true }
    );
    this.init()
  }

  init(){
    const clockX=new Clock()
    const clockY=new Clock()

    const {gestureState,translationX,translationY,velocityX,offsetY, offsetX}=this

    gestureState.setValue(State.UNDETERMINED);
    translationX.setValue(0);
    translationY.setValue(0);
    velocityX.setValue(0);
    offsetY.setValue(0);
    offsetX.setValue(0);

    const snapPoint=cond(and(lessThan(translationX,0),lessThan(velocityX,-10)),-rotatedWidth,
      cond(and(greaterThan(translationX,0),greaterThan(velocityX,10)),rotatedWidth,
      0)
    )

    this.translateX=cond(eq(gestureState,State.END),[
      set(translationX,runSpring(clockX,translationX,snapPoint)),
      set(offsetX, translationX),
      cond(and(eq(clockRunning(clockX),0),neq(translationX,0)),[call([translationX],this.onSwiped)]),
      translationX
    ],
      translationX
    )

    this.translateY=cond(eq(gestureState,State.END),[
      set(translationY,runSpring(clockY,translationY,0)),
      set(offsetY, translationY),
      translationY
    ],
      translationY,
    )
  }

  onSwiped=([translationX])=>{
    console.log({ likes: translationX > 0 });
    const { profiles: [lastProfile, ...profiles] } = this.state;
    this.setState({ profiles }, this.init);
  }

  render() {
    const { profiles: [lastProfile, ...profiles] } = this.state;

    const {onGestureEvent,translateX,translateY}=this

    const rotateZ=concat(interpolate(translateX,{
      inputRange:[-width/2,width/2],
      outputRange:[15,-15]
    }),"deg")

    const likeVisible=interpolate(translateX,{
      inputRange:[0,width/4],
      outputRange:[0,1],
      extrapolate:Extrapolate.CLAMP
    })
    
    const nopeVisible=interpolate(translateX,{
      inputRange:[-width/4,0],
      outputRange:[1,0],
      extrapolate:Extrapolate.CLAMP
    })

    const style={
      ...StyleSheet.absoluteFillObject,
      zIndex: 900,
      transform:[
        {translateX},
        {translateY},
        {rotateZ}
      ]
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Icon name="person-outline" size={32} color="gray" />
          <Icon name="chatbubble-outline" size={32} color="gray" />
        </View>
        <View style={styles.cards}>
          {
              profiles.reverse().map(profile => (
                <Card key={profile.id} {...{ profile }} />
              ))
          }
          <PanGestureHandler {...{onGestureEvent}} onHandlerStateChange={onGestureEvent}>
            <Animated.View {...{style}}>
              <Card profile={lastProfile} {...{likeVisible,nopeVisible}} />
            </Animated.View>
          </PanGestureHandler>
        </View>
        <View style={styles.footer}>
          <View style={styles.circle}>
            <Icon name="close-outline" size={36} color="#ec5288" />
          </View>
          <View style={styles.circle}>
            <Icon name="heart-outline" size={32} color="#6ee3b4" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    flex: 1,
    margin: 8,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});
