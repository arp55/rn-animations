import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { block, call, Clock, cond, Easing, eq, interpolate, onChange, or, set, useCode } from 'react-native-reanimated'
import { onGestureEvent, timing } from 'react-native-redash/lib/module/v1'

const {Value}=Animated

function Button() {
    const animation=new Value(0)
    const clock= new Clock()
    const state=new Value(State.UNDETERMINED)
    const gestureHandler=onGestureEvent({state})
    const shouldScale=new Value(-1)

    const scale=interpolate(animation,{
        inputRange:[0,1],
        outputRange:[1,1.5]
    })

    useCode(()=>[
        block([
            cond(eq(state,State.BEGAN),set(shouldScale,1)),
            cond(or(eq(state,State.FAILED),eq(state,State.CANCELLED)),set(shouldScale,0)),
            onChange(state,cond(eq(state,State.END),[call([],onPress),set(shouldScale,0)])),
            cond(eq(shouldScale,1),set(animation,timing({clock,duration:10,from:animation,to:1,easing:Easing.linear}))),
            cond(eq(shouldScale,0),set(animation,timing({clock,duration:1000,from:animation,to:0,easing:Easing.linear})))
        ])
    ],[])

    const onPress=()=>{
        alert("I'm Pressed!")
    }

    return (
        <View style={styles.container}>
            <TapGestureHandler {...gestureHandler}>
                <Animated.View>
                    <Animated.Image style={[styles.image,{transform:[{scale}]}]} source={require("./assets/btn.png")} />
                </Animated.View>
            </TapGestureHandler>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginVertical:120,
        alignItems:'center'
    },
    image:{
        height:120,
        width:160
    }
})

export default Button