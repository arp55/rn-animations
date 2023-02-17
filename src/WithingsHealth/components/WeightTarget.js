import { scaleLinear } from 'd3'
import React, { Component } from 'react'
import { Animated, Dimensions, InteractionManager, StyleSheet, TextInput, View } from 'react-native'
import Graph, { ROW_HEIGHT } from './Graph'

type WeightTargetProps={
    weight:number;
    height:number;
}

type WeightTargetState={
    y:Animated.Value;
    initialized:boolean;
}

const { height }=Dimensions.get("window")
const PADDING=50

export default class WeightTarget extends Component<WeightTargetProps,WeightTargetState> {
    scroll=React.createRef()
    relativeValue=React.createRef()
    absoluteValue=React.createRef()
    welcomeValue=React.createRef()
    listener=null

    constructor(props:WeightTargetProps){
        super(props)
        const {weight,height:h}=props
        const BMI=Math.round(weight/(h*h))
        const from=BMI-10
        const to=BMI+10
        this.scaleBMI=scaleLinear().domain([0,(to-from+1)*ROW_HEIGHT-height]).range([to,from])
        this.state={
            y:new Animated.Value(this.scaleBMI.invert(BMI)),
            initialized:false
        }
    }

    componentDidMount(){
        const {weight,height:h}=this.props
        const BMI=Math.round(weight/(h*h))
        console.log({BMI})
        this.listener=this.state.y.addListener(this.update)
        InteractionManager.runAfterInteractions(()=>{
            const y= this.scaleBMI.invert(BMI)
            console.log({y})
            this.scroll.current.scrollTo({ y,animated:false })
            this.update({value:y},true)
        })
    }

    componentWillUnmount(){
        this.state.y.removeListener(this.listener)
    }

    update=({value},init)=>{
        const {height:h,weight}=this.props
        const BMI=this.scaleBMI(value)
        const absoluteValue=(BMI*h*h).toFixed(1)
        const relativeValue=(weight-absoluteValue).toFixed(1)
        // if(init){
        //     this.welcomeValue.current.setNativeProps({text: `${absoluteValue}`})
        // }
        this.absoluteValue.current.setNativeProps({text: `${absoluteValue}`})
        this.relativeValue.current.setNativeProps({text: `${relativeValue}`})
        if(!init){
            this.setState({initialized:true})
        }
    }

    render() {
        const {y,initialized}=this.state
        const {height:h,weight}=this.props
        const BMI=Math.round(weight/(h*h))
        const from=BMI-10
        const to=BMI+10
        console.log(initialized)
        const inputRange=[0,(to-from+1)*ROW_HEIGHT-height]
        const translateY=y.interpolate({
            inputRange,
            outputRange:[-height/2+PADDING,height/2-PADDING]
        })
        const translateY2=y.interpolate({
            inputRange,
            outputRange:[height/2-PADDING,-height/2+PADDING]
        })
        const scale=y.interpolate({
            inputRange:[0,inputRange[1]/2,inputRange[1]],
            outputRange:[1,0,1]
        })
        const scaleY=y.interpolate({
            inputRange:[0,inputRange[1]/2,inputRange[1]],
            outputRange:[height-PADDING,25,height-PADDING]
        })
        return (
            <View style={styles.container}>
                <Animated.ScrollView
                    ref={this.scroll}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent:{
                                    contentOffset:{ y }
                                }
                            }
                        ],
                        {useNativeDriver:true}
                    )}
                >
                    <Graph {...{from,to}} />
                </Animated.ScrollView>
                <View style={styles.overlay} pointerEvents="none">
                    <Animated.View style={[styles.line,{transform:[{scaleY}]}]} />
                </View>
                <View style={styles.overlay} pointerEvents="none">
                    <Animated.View style={[styles.relativeCircle,{transform:[{scale}]}]}>
                        <TextInput ref={this.relativeValue} style={styles.relativeValue} />
                    </Animated.View>
                </View>
                <View style={styles.overlay} pointerEvents="none">
                    <Animated.View style={[styles.oppositeCircle,{transform:[{translateY:translateY2}]}]} />
                </View>
                <View style={styles.overlay} pointerEvents="none">
                    <Animated.View style={[styles.absoluteCircle,{transform:[{translateY}]}]}>
                        <TextInput ref={this.absoluteValue} style={styles.absoluteValue} />
                    </Animated.View>
                </View>
                {/* {
                    !initialized&&(
                        <View style={styles.welcome} pointerEvents="none">
                            <Animated.View style={[styles.absoluteCircle,{transform:[{translateY}]}]}>
                                <TextInput ref={this.welcomeValue} style={styles.absoluteValue} />
                            </Animated.View>
                        </View>
                    )
                } */}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    overlay:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center'
    },
    absoluteCircle:{
        height:100,
        width:100,
        borderRadius:50,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    relativeCircle:{
        height:100,
        width:100,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'#69d0fb',
        justifyContent:'center',
        alignItems:'center'
    },
    oppositeCircle:{
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:'#fff'
    },
    line:{
        backgroundColor:'#fff',
        width:1,
        height:1
    },
    relativeValue:{
        fontSize:22,
        color:'#fff'
    },
    absoluteValue:{
        fontSize:24,
        color:'#69d0fb'
    },
    welcome:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#69d0fb'
    },
})