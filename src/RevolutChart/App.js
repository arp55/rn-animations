import React, { Component } from 'react'
import { Animated, Dimensions, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

import * as shape from 'd3-shape';

import {
    scaleTime,
    scaleLinear,
    scaleQuantile
} from 'd3-scale';
// import Animated, { event, Value } from 'react-native-reanimated';
import * as path from 'svg-path-properties'

const d3 = {
  shape,
};

const {Value,event}=Animated

const {width}=Dimensions.get("window")
const height=200
const verticalPadding=5
const cursorRadius=10
const labelWidth=100

const data=[
    {x:new Date(2018,9,1),y:0},
    {x:new Date(2018,9,16),y:0},
    {x:new Date(2018,9,17),y:200},
    {x:new Date(2018,10,1),y:200},
    {x:new Date(2018,10,2),y:300},
    {x:new Date(2018,10,5),y:300},
]

const scaleX= scaleTime().domain([new Date(2018,9,1),new Date(2018,10,5)]).range([0,width])
const scaleY= scaleLinear().domain([0,300]).range([height-verticalPadding,verticalPadding])
const scaleLabel=scaleQuantile().domain([0,300]).range([0,200,300])
const line= d3.shape.line()
    .x(d=>scaleX(d.x))
    .y(d=>scaleY(d.y))
    .curve(d3.shape.curveBasis)(data)
const properties = new path.svgPathProperties(line)
const lineLength = properties.getTotalLength();

class App extends Component {
    cursor=React.createRef()
    label=React.createRef()
    state={
        x:new Value(0)
    }

    moveCursor(value){
        const {x,y}=properties.getPointAtLength(lineLength-value);
        this.cursor.current.setNativeProps({top:y-cursorRadius,left:x-cursorRadius})
        const label=scaleLabel(scaleY.invert(y));
        this.label.current.setNativeProps({text:`${label} Rs`})
    }

    componentDidMount(){
        this.state.x.addListener(({value})=>this.moveCursor(value))
        this.moveCursor(0)
    }

    render() {
        const { x }=this.state

        const translateX=x.interpolate({
            inputRange:[0,width],
            outputRange:[width-labelWidth,0],
            extrapolate:'clamp'
        })
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <Svg {...{width,height}}>
                        <Defs>
                            <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                                <Stop offset="0%" stopColor="#cee3f9" />
                                <Stop offset="80%" stopColor="#ddedfa" />
                                <Stop offset="100%" stopColor="#feffff" />
                            </LinearGradient>
                        </Defs>
                        <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={5} />
                        <Path d={`${line} L${width} ${height} L 0 ${height}` } fill="url(#gradient)" />
                        <View ref={this.cursor} style={styles.cursor} />
                    </Svg>
                    <Animated.View style={[styles.label,{transform:[{translateX}]}]}>
                        <TextInput ref={this.label} />
                    </Animated.View>
                    <Animated.ScrollView
                        style={StyleSheet.absoluteFill}
                        horizontal
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        contentContainerStyle={{width:lineLength*2}}
                        onScroll={event([
                            {
                                nativeEvent:{
                                    contentOffset:{
                                        x
                                    }
                                }
                            }
                        ],
                        { useNativeDriver:true }
                        )}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1,
    },
    container:{
        marginTop:60,
        height,
        width
    },
    cursor:{
        position:'absolute',
        height:cursorRadius*2,
        width:cursorRadius*2,
        borderRadius:cursorRadius,
        borderWidth:3,
        borderColor:'#367be2',
        backgroundColor:'white'
    },
    label:{
        width:labelWidth,
        backgroundColor:'lightgray',
        position:'absolute',
        top:-25,
        left:0
    }
})

export default App