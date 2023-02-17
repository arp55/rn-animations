// @flow
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  Video,
} from 'expo-av';

import { type Video as VideoModel } from './videos';
import VideoContent from './VideoContent';
import PlayerControls, { PLACEHOLDER_WIDTH } from './PlayerControls';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { add, and, Clock, clockRunning, cond, eq, event, Extrapolate, greaterThan, interpolate, or, set, spring, startClock, stopClock, Value } from 'react-native-reanimated';
// import { Constants } from 'react-native-unimodules';

const { width, height } = Dimensions.get('window');
// const statusBarHeight = Constants.statusBarHeight;
// console.log(statusBarHeight)
const shadow = {
  alignItems: 'center',
  elevation: 1,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.18,
  shadowRadius: 2,
};

const midBound=height-3*64
const upperBound=midBound+104

type VideoModalProps = {
  video: VideoModel,
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

const AnimatedVideo=Animated.createAnimatedComponent(Video)


export default class VideoModal extends React.PureComponent<VideoModalProps> {
  translationY=new Value(0)
  velocityY= new Value(0)
  gestureState=new Value(State.UNDETERMINED)
  translateY=new Value(0)
  offsetY=new Value(0)

  constructor(props){
    super(props)
    const {gestureState:state,translationY,velocityY,offsetY}=this
    this.onGestureEvent=event([
      {
        nativeEvent:{ translationY,velocityY,state }
      }
    ],
    { useNativeDriver: true }
    )

    const clockY=new Clock()
     
    const snapPoint=cond(or(greaterThan(translationY,height/2),and(greaterThan(translationY,height/4),greaterThan(velocityY,10))),[
      upperBound
    ],0)

    this.translateY=cond(eq(state,State.END),[
      set(translationY,runSpring(clockY,add(offsetY,translationY),snapPoint)),
      set(offsetY,translationY),
      translationY
    ],[
      cond(eq(state,State.BEGAN),[
        stopClock(clockY),
        add(translationY,offsetY)
      ],add(translationY,offsetY))
    ]
    )
  }

  render() {
    const { video } = this.props;
    const {onGestureEvent,translateY:tY}=this

    const translateY= interpolate(tY,{
      inputRange:[0,upperBound],
      outputRange:[0,upperBound],
      extrapolate:Extrapolate.CLAMP
    })

    const contentOpacity= interpolate(translateY,{
      inputRange:[0,midBound],
      outputRange:[1,0]
    })

    const contentWidth=interpolate(translateY,{
      inputRange:[0,midBound,upperBound],
      outputRange:[width,width-10,width-20]
    })

    const contentHeight=interpolate(translateY,{
      inputRange:[0,upperBound],
      outputRange:[height,0]
    })

    const videoHeight=interpolate(translateY,{
      inputRange:[0,upperBound],
      outputRange:[width / 1.78,width/(1.78*3)]
    })

    const videoMargin=interpolate(translateY,{
      inputRange:[0,upperBound],
      outputRange:[0,10]
    })
    
    const videoWidth=interpolate(translateY,{
      inputRange:[0,midBound,upperBound],
      outputRange:[width,width-10,PLACEHOLDER_WIDTH],
      extrapolate:Extrapolate.CLAMP
    })

    const playerControlOpacity=interpolate(translateY,{
      inputRange:[midBound,upperBound],
      outputRange:[0,1]
    })

    return (
      <>
        {/* <View
          style={{
            height: statusBarHeight,
            backgroundColor: 'black',
          }}
        /> */}
        <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{onGestureEvent}}>
          <Animated.View
            style={{
              transform:[
                {translateY}
              ],
              ...shadow,
              // flex:1
            }}
          >
            <Animated.View style={{ backgroundColor: 'white', width:contentWidth }}>
              <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity:playerControlOpacity }}>
                <PlayerControls title={video.title} onPress={() => true} />
              </Animated.View>
              <AnimatedVideo
                source={video.video}
                style={{ width:videoWidth, height: videoHeight }}
                resizeMode={Video.RESIZE_MODE_COVER}
                shouldPlay
              />
            </Animated.View>
            <Animated.View style={{ backgroundColor: 'white', width:contentWidth, height:contentHeight,marginBottom:videoMargin }}>
              <Animated.View style={{flex:1,opacity:contentOpacity}}>
                <VideoContent {...{ video }} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
}
