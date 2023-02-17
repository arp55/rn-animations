import React,{ useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { add, Extrapolate, interpolate } from 'react-native-reanimated'
import { diffClamp, usePanGestureHandler, withDecay } from 'react-native-redash/lib/module/v1'

const {height,width}=Dimensions.get('window')

const ratio=228/360
const Card_width=width*0.9
const Card_height=Card_width*ratio

const margin=16;

const HEIGHT=Card_height+margin*2

export const cards=[
    require('./assets/card1.png'),
    require('./assets/card2.png'),
    require('./assets/card3.png'),
    require('./assets/card4.png'),
    require('./assets/card5.png'),
    require('./assets/card6.png'),
]

function Wallet() {
    const [containerHeight,setContainerHeight]=useState(height)
    const {gestureHandler,state,velocity,translation}=usePanGestureHandler()
    const visibleCards=Math.floor(containerHeight/HEIGHT)
    const y=diffClamp(withDecay({value:translation.y,velocity:velocity.y,state}),-HEIGHT*cards.length+visibleCards*HEIGHT,0)

    return (
        <View style={{flex:1}}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={styles.container} onLayout={(({nativeEvent:{layout:{height:h}}})=>{setContainerHeight(h)})}>
                    {cards.map((card,index)=>{
                        const positionY=add(y,HEIGHT*index)
                        const isDisappearing=-HEIGHT
                        const isTop=0
                        const isBottom=HEIGHT*(visibleCards-1)
                        const isAppearing=HEIGHT*visibleCards

                        const translateYWithScale=interpolate(positionY,{inputRange:[isBottom,isAppearing],outputRange:[0,-HEIGHT/4],extrapolate:Extrapolate.CLAMP})

                        const translateY=add(interpolate(y,{inputRange:[-HEIGHT*index,0],outputRange:[-HEIGHT*index,0],extrapolate:Extrapolate.CLAMP}),translateYWithScale)

                        const scale=interpolate(positionY,{
                            inputRange:[isDisappearing,isTop,isBottom,isAppearing],
                            outputRange:[0.5,1,1,0.5],
                            extrapolate:Extrapolate.CLAMP
                        })

                        const opacity=interpolate(positionY,{
                            inputRange:[isDisappearing,isTop,isBottom,isAppearing],
                            outputRange:[0,1,1,0],
                            extrapolate:Extrapolate.CLAMP
                        })

                        return(
                            <Animated.View style={[styles.cardHold,{opacity,transform:[{translateY},{scale}]}]}>
                                <Image style={styles.card} source={card}/>
                            </Animated.View>
                        )
                    })}
                </Animated.View>
        </PanGestureHandler>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        paddingVertical:22,
        alignItems:'center',
    },
    card:{
        width:Card_width,
        height:Card_height,
    },
    cardHold:{
        alignItems:'center',
        margin:margin
    }
})

export default Wallet