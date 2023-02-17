import { Video } from 'expo-av'
import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { and, block, call, Clock, clockRunning, cond, eq, event, greaterThan, interpolate, lessOrEq, set, spring, startClock, stopClock, Value } from 'react-native-reanimated'
import { Story } from './StoryModel'


type ModalProps= {
    story:Story;
    position:Position;
    onRequestClose:()=>void;
}

const {width:wWidth,height:wHeight}=Dimensions.get('window')

function runSpring(value, dest) {
    const clock = new Clock();
    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0),
    };
  
    const config = {
      toValue: new Value(0),
      damping: 10,
      mass: 1,
      stiffness: 100,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.velocity, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]),
      spring(clock, state, config),
      cond(state.finished, stopClock(clock)),
      set(value, state.position),
    ]);
}

export default class StoryModal extends Component<ModalProps> {
    constructor(props){
        super(props)
        const {x,y,width,height}=props.position
        this.translateX=new Value(x)
        this.translateY=new Value(y)
        this.width=new Value(width)
        this.height=new Value(height)
        this.velocityY=new Value(0)
        this.state=new Value(State.UNDETERMINED)
        this.onGestureEvent=event([{
            nativeEvent:{
                translationX:this.translateX,
                translationY:this.translateY,
                velocityY:this.velocityY,
                state:this.state
            }
        }],
        
        )
    }
    render() {
        const {story,onRequestClose}=this.props
        const {translateX,translateY,width,height,onGestureEvent}= this
        const style={
            transform:[
                {translateX},
                {translateY},
            ],
            width,
            height,
        }
        return (
            <View style={styles.container}>
                <Animated.Code>
                    {
                        ()=> block([
                                cond(eq(this.state,State.UNDETERMINED),runSpring(translateX,0)),
                                cond(eq(this.state,State.UNDETERMINED),runSpring(translateY,0)),
                                cond(eq(this.state,State.UNDETERMINED),runSpring(width,wWidth)),
                                cond(eq(this.state,State.UNDETERMINED),runSpring(height,wHeight)),
                                cond(and(eq(this.state,State.END),lessOrEq(this.velocityY,0)),[
                                    runSpring(translateX,0),
                                    runSpring(translateY,0),
                                    runSpring(width,wWidth),
                                    runSpring(height,wHeight)
                                ]),
                                cond(and(eq(this.state,State.END),greaterThan(this.velocityY,0)),[
                                    runSpring(translateX,this.props.position.x),
                                    runSpring(translateY,this.props.position.y),
                                    runSpring(width,this.props.position.width),
                                    runSpring(height,this.props.position.height),
                                    cond(eq(height,this.props.position.height),call([],onRequestClose))
                                ]),
                                cond(eq(this.state,State.ACTIVE),[
                                    set(height,interpolate(translateY,{
                                        inputRange: [wHeight / 4, wHeight - this.props.position.height],
                                        outputRange: [wHeight, this.props.position.height],
                                    })),
                                    set(width,interpolate(translateY,{
                                        inputRange: [wHeight / 4, wHeight - this.props.position.height],
                                        outputRange: [wWidth, this.props.position.width],
                                    }))
                                ])
                            ])
                        
                    }
                </Animated.Code>
                <PanGestureHandler 
                    activeOffsetY={100}
                    {...{onGestureEvent}}
                    onHandlerStateChange={onGestureEvent}
                >
                    <Animated.View {...{style}}>
                        {
                            story.video && (
                                <Video
                                    source={story.video}
                                    style={StyleSheet.absoluteFill}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    // useNativeControls
                                    resizeMode="contain"
                                    isLooping
                                    shouldPlay
                                />
                            )
                        }
                        {
                            !story.video && (
                                <Image source={story.source} style={styles.image} />
                            )
                        }
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        // backgroundColor:'green'
    },
    image:{
        ...StyleSheet.absoluteFill,
        width:null,
        height:null,
        borderRadius:10
    }
})
