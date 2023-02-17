import MaskedView from '@react-native-community/masked-view'
import React, { Component } from 'react'
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import TabBar from './TabBar'

import {Tab_Bar_Width,Tab_Height,Tab_Width} from "./TabBar"

export default class Chrome extends Component {
    state={
        x:new Animated.Value(0)
    }

    render(){
        const {x}=this.state

        const translateX=x.interpolate({
            inputRange:[0,Tab_Bar_Width],
            outputRange:[Tab_Bar_Width-Tab_Width,0]
        })

        x.addListener(({value})=>console.log(value))

        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <TabBar backgroundColor='#cecccc' color="#fefefe" borderColor="#6d6c6d" />
                    <MaskedView
                        style={StyleSheet.absoluteFill}
                        maskElement={ <Animated.View style={[styles.activeMask,{transform:[{translateX}]}]} /> }
                    >
                        <TabBar backgroundColor='#fefefe' color="gray" borderColor="#cecccc" />
                    </MaskedView>
                    <Animated.ScrollView
                        style={StyleSheet.absoluteFill}
                        contentContainerStyle={{width:Tab_Bar_Width*2}}
                        bounces={false}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([
                            {
                                nativeEvent : { contentOffset : { x } }
                            }
                        ],
                            {useNativeDriver:true}
                        )}
                        snapToInterval={Tab_Width+Tab_Width/2}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1,
        alignItems:'center',
        padding:200,
        backgroundColor:'#6d6c6d'
    },
    container:{
        width:Tab_Bar_Width,
        height:Tab_Height
    },
    activeMask:{
        backgroundColor:'#fefefe',
        width:Tab_Width,
        height:Tab_Height
    }
})
