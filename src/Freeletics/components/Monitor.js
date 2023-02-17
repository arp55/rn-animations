import React, { Component } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'
import Svg, { Path } from 'react-native-svg'
const path = require("svg-path-properties");

type MonitorProps={
    distance:number;
    pace:number;
    totalDistance:number;
}

type MonitorState={
    duration:number;
}

const {width}=Dimensions.get('window')

const radius=(width/2)-(width/15)
const padding=8

const d=`M${padding} ${padding+130} A100 90, 0, 0 1, ${radius*2+padding} ${padding+130}`

const properties = new path.svgPathProperties(d);
const length = properties.getTotalLength();

export default class Monitor extends Component<MonitorProps,MonitorState> {
    state={
        duration:0
    }
    interval=0

    componentDidMount(){
        this.interval=setInterval(()=>{this.setState({duration:this.state.duration+1})},1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    formatDuration=(duration)=>(moment().startOf('day').seconds(duration).format('mm:ss'))

    render() {
        const { duration }=this.state
        const {distance,pace,totalDistance}=this.props
        const ratio=distance/totalDistance
        console.log(ratio)
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex:1,alignItems:'center'}}>
                    <Svg style={styles.svg}>
                        <Path {...{d}} stroke="#fff" strokeWidth={padding*2} />
                        <Path {...{d}} stroke="#f2b659" strokeWidth={padding*2} strokeDasharray={length} strokeDashoffset={length-(length*ratio)} />
                    </Svg>
                    <View style={styles.progressLabel}>
                        <Text style={styles.distanceText}>{distance}</Text>
                    </View>
                </View> 
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Icon name="clock" style={styles.icon} />
                        <Text style={styles.time}>
                            {pace}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="watch" style={styles.icon} />
                        <Text style={styles.time}>
                            {this.formatDuration(duration)}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    distanceText:{
        fontSize:42,
        color:'#fff'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    time:{
        color:'#fff',
        fontSize:22
    },
    icon:{
        fontSize:22,
        color:"#fff"
    },
    svg:{
        width:radius*2+padding*2,
        height:radius*2+padding*2,
        padding:5
    },
    progressLabel:{
        ...StyleSheet.absoluteFill,
        justifyContent:"center",
        alignItems:'center'
    }
})