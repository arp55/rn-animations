import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Ionicons'
import { interpolatePath } from 'd3-interpolate-path'

type ProgressState={
    d:string;
}

const width=125
const height=125

const paths=[
    "M113.5 61.5C113.5 75.4679 109.275 90.2893 99.9999 99.4999C90.5721 108.863 75.9769 112.5 61.4999 112.5C32.7811 112.5 9.49988 86.6534 9.49988 58.4869C9.49988 30.3203 32.7811 7.48685 61.4999 7.48685C90.2187 7.48685 113.5 14.4869 113.5 61.5Z",
    "M109.911 61.4999C113.456 78.6102 104.686 90.2892 95.4114 99.4999C85.9836 108.863 75.9769 112.5 61.4999 112.5C32.4113 115.474 9.49988 96.4868 9.49988 58.4869C9.49988 30.3203 32.7811 7.48685 61.4999 7.48685C89.9113 10.9737 101.411 20.4737 109.911 61.4999Z",
    "M113 63.487C116.545 80.5973 107.774 92.2763 98.4998 101.487C89.0721 110.85 79.0654 115.487 64.5884 115.487C34.9999 122.987 9.49988 96.4868 9.49988 58.4869C9.49988 30.3203 35.8696 9.47392 64.5884 9.47392C91.9999 15.9869 104.5 22.4607 113 63.487Z",
    "M113.5 61.5C113.5 75.4679 109.275 90.2893 99.9999 99.4999C90.5721 108.863 75.9769 112.5 61.4999 112.5C32.7811 112.5 9.49988 86.6534 9.49988 58.4869C9.49988 30.3203 32.7811 7.48685 61.4999 7.48685C90.2187 7.48685 113.5 14.4869 113.5 61.5Z",
]

export default class Progress extends Component<ProgressState> {
    interval=null
    state={
        d:paths[2]
    }

    interpolator=interpolatePath(paths[0],paths[1])
    lastIndex=1
    progress=0

    componentDidMount(){
        this.interval=setInterval(this.animate,100)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    animate=()=>{
        requestAnimationFrame(()=>{
            this.progress+=0.1
            if(this.progress>=1){
                this.progress=0
                if(this.lastIndex===paths.length-1){
                    this.lastIndex=0
                }
                this.interpolator=interpolatePath(paths[this.lastIndex],paths[this.lastIndex+1])
                ++this.lastIndex
            }
            const d=this.interpolator(this.progress)

            this.setState({ d })
        })
    }

    render() {
        const { d }=this.state
        return (
            <View style={styles.container}>
                <Svg {...{height,width}}>
                    <Path fill="#71758e" {...{d}} />
                </Svg>
                <View style={styles.pauseIcon}>
                    <Icon name="ios-pause" color="#fbe3b9" size={54} />
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    pauseIcon:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center'
    }
})
