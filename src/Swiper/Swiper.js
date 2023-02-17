import React, { useEffect } from 'react'
import {Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, clockRunning, cond, debug, divide, Easing, eq, floor, not, set, useCode } from 'react-native-reanimated'
import {timing, usePanGestureHandler, useValue, snapPoint, useClock} from 'react-native-redash/lib/module/v1'

const images=[
    require('./assets/1.jpg'),
    require('./assets/2.jpg'),
    require('./assets/3.jpg'),
    require('./assets/4.jpg'),
    require('./assets/5.jpg')
]

const {width,height}=Dimensions.get("window")

const snapPoints=images.map((_,i)=>i*-width)

export default function Swiper() {
    const clock=useClock()
    const index=useValue(0)
    const offsetX=useValue(0)
    const translateX=useValue(0)
    const {gestureHandler,state,velocity,translation}=usePanGestureHandler()

    const to=snapPoint(translateX,velocity.x,snapPoints)

    useCode(()=>[
        cond(eq(state,State.ACTIVE),[set(translateX,add(offsetX,translation.x)),debug('to',to)]),
        
        cond(eq(state,State.END),[set(translateX,timing({clock,duration:1000,from:translateX,to,easing: Easing.ease})),set(offsetX,translateX),cond(not(clockRunning(clock)),[set(index,floor(divide(translateX,-width))),debug("index",index)])]),
    ],[])

    return (
        <View style={styles.container}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    <Animated.View style={[styles.pictures,{transform:[{translateX}]}]}>
                        {images.map((image,i)=>
                            <View style={styles.picture}>
                                <Image style={styles.image} source={image} />
                            </View>
                        )}
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'black'
    },
    image:{
        height:undefined,
        width:undefined,
        ...StyleSheet.absoluteFillObject
    },
    picture:{
        height,
        width,
        overflow:'hidden'
    },
    pictures:{
        height,
        width:width*images.length,
        flexDirection:'row'
    }
})