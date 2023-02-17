import React, { Component } from 'react'
import { Animated, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import Story from './Story'


const {width}=Dimensions.get("window")
const perspective=width
const A=Math.atan(perspective/(width/2))
const ratio=Platform.OS==="ios"?2:1.2


export default class Stories extends Component {
    state={
        x:new Animated.Value(0)
    }

    getStyle(index){
        const {x}=this.state
        const offset=width*index
        const inputRange=[offset-width,offset+width]
        const translateX=x.interpolate({
            inputRange,
            outputRange:[width/ratio,-width/ratio],
            extrapolate:'clamp'
        })
        const rotateY=x.interpolate({
            inputRange,
            outputRange:[`${A}rad`,`-${A}rad`],
            extrapolate:'clamp'
        })
        const translateX1=x.interpolate({
            inputRange,
            outputRange:[width/2,-width/2],
            extrapolate:'clamp'
        })
        
        const extra=((width/ratio)/Math.cos(A/2))-width/ratio

        const translateX2=x.interpolate({
            inputRange,
            outputRange:[-extra,extra],
            extrapolate:'clamp'
        })

        return {
            ...StyleSheet.absoluteFillObject,
            transform:[
                {perspective},
                {translateX},
                {rotateY},
                {translateX:translateX1},
                {translateX:translateX2}
            ]
        }
    }

    getMaskStyle(index) {
        const { x } = this.state;
        const offset = index * width;
        const inputRange = [offset - width, offset, offset + width];
        const opacity = x.interpolate({
          inputRange,
          outputRange: [0.75, 0, 0.75],
          extrapolate: 'clamp',
        });
        return {
          backgroundColor: 'black',
          ...StyleSheet.absoluteFillObject,
          opacity,
        };
      }

    render() {
        const {stories}=this.props
        const {x}=this.state
        return (
            <View style={styles.container}>
                {
                    stories.map((story,index)=>(
                        <Animated.View key={story.id} style={this.getStyle(index)}>
                            <Story {...{story}} />
                            <Animated.View style={this.getMaskStyle(index)} />
                        </Animated.View>
                    ))
                }
                <Animated.ScrollView
                    style={StyleSheet.absoluteFillObject}
                    horizontal
                    snapToInterval={width}
                    contentContainerStyle={{width:width*stories.length}}
                    scrollEventThrottle={10}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.85}
                    onScroll={Animated.event(
                        [{
                            nativeEvent:{
                                contentOffset:{
                                    x
                                },
                            }
                        }],
                        {useNativeDriver:true}
                    )}
                />
            </View>
        )
    }
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:6,
        backgroundColor:'#000'
    }
})