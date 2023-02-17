import React, { Component } from 'react'
import { Animated, StyleSheet, View } from 'react-native'


class Pin extends Component {
    state={
        animation:new Animated.Value(0)
    }

    componentDidMount(){
        const {animation}=this.state
          Animated.loop(
            Animated.sequence([
              Animated.timing(animation, {
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(animation, {
                toValue: 0,
                duration: 1000,
              }),
            ]),
            {
              useNativeDriver: true,
            },
          ).start();
    }

    render() {
        const scale=this.state.animation.interpolate({
            inputRange:[0,1],
            outputRange:[1,1.3],
        })
        return (
            <View style ={styles.outerpin}>
                <View style={styles.pin}>
                    <Animated.View style={[styles.innerPin,{transform:[{scale}]}]}/>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    outerpin:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:'rgba(242,182,89,0.25)',
        justifyContent:'center',
        alignItems:'center'
    },
    pin:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    innerPin:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'#f2b659'
    }
})

export default Pin
