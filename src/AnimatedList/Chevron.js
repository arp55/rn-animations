import React from 'react'
import { processColor, StyleSheet, View } from 'react-native'
import Animated, { interpolate, interpolateColors, Value } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'

function Chevron({open,transition}) {
    let backgroundColor=new Value(processColor('#417569'))
    // backgroundColor=interpolateColors(transition,{
    //     inputRange:[0,1],
    //     outputRange:[processColor('#e54b55'),processColor('#417569')]
    // })
    const rotateZ=interpolate(transition,{
        inputRange:[0,1],
        outputRange:[Math.PI,'0deg']
    })
    return (
        <Animated.View style={[styles.icon,{backgroundColor:backgroundColor?backgroundColor:'#e54b55',transform:[{rotateZ}]}]}>
          <Icon name='chevron-down-outline' size={32}/>
        </Animated.View>
    )
}

const styles=StyleSheet.create({
    icon:{
        borderRadius:30
    }
})

export default Chevron
