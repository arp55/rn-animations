import React from 'react'
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { cond, debug, eq, not, useCode } from 'react-native-reanimated'
import {cards} from '../Wallet/Wallet'

const {height,width}=Dimensions.get('window')

const ratio=228/360
const Card_width=width*0.9
const Default_Height=Card_width*ratio

const margin=16;

const Card_height=Default_Height+margin*2

function FlatWallet() {
    const AnimatedList=Animated.createAnimatedComponent(FlatList)

    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
      useNativeDriver: true,
    });

    const renderItem=({item,index})=>{
        const position=Animated.subtract(index*Card_height,y)
        const isDisappear=-Card_height
        const isTop=0
        const isBottom=height-Card_height
        const isAppear=height

        const translateY=Animated.add(
            Animated.add(y,y.interpolate({
                    inputRange:[0,0.00001+index*Card_height],
                    outputRange:[0,-index*Card_height],
                    extrapolate:'clamp'
                })
            ),
            position.interpolate({
                inputRange:[isBottom,isAppear],
                outputRange:[0,-Card_height/4],
                extrapolate:'clamp'
            })
        )

        const scale=position.interpolate({
            inputRange:[isDisappear,isTop,isBottom,isAppear],
            outputRange:[0.5,1,1,0.5],
            extrapolate:'clamp'
        })

        const opacity=position.interpolate({
            inputRange:[isDisappear,isTop,isBottom,isAppear],
            outputRange:[0,1,1,0],
            extrapolate:'clamp'
        })
        
        return(
            <View>
            <Animated.View style={[styles.cardCont,{ opacity, transform: [{ translateY },{scale}] }]}>
                <Image style={styles.card} source={item}/>
            </Animated.View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <AnimatedList
                showsVerticalScrollIndicator={false}
                data={cards}
                bounces={false}
                scrollEventThrottle={16}
                renderItem={renderItem}
                keyExtractor={item => item}
                {...{onScroll}}
            />
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
        height:Default_Height,
    },
    cardCont:{
        marginVertical: margin,
        alignSelf: "center",
    }
})

export default FlatWallet