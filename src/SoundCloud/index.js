import React, { Component } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import Waves from './components/Waves'

import waveform from './data/waveform.json'

export default class SoundCloud extends Component {
    state={
        x:new Animated.Value(0)
    }
    render() {
        const { x }=this.state

        x.addListener(({value})=>console.log(value))

        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:'https://source.unsplash.com/random'}} />
                <View style={styles.player}>
                    <View>
                        <Animated.ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={Animated.event([
                                {
                                    nativeEvent : { contentOffset : { x } }
                                }
                            ])}
                            bounces={false}
                        >
                            <View style={{flex:1}}>
                                <Waves {...{waveform}} color="#ffffff" />
                                <View style={StyleSheet.absoluteFill}>
                                    <Waves {...{waveform}} color="#e95f2a" progress={x} />
                                </View>
                            </View>
                        </Animated.ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-end'
    },
    image:{
        ...StyleSheet.absoluteFillObject,
        width:null,
        height:null
    },
    player:{
        flex:0.5,
        justifyContent:'center'
    }
})