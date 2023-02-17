import React, { Component } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import _ from 'lodash'

const {width}=Dimensions.get("window")
const dash =width/50


export default class Selector extends Component {
    render() {
        return (
            <View style={styles.row}>
                {
                    _.times(50).map((v,i)=>( <View key={i} style={styles.dash} /> ))
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    row:{
        flexDirection:'row',
    },
    dash:{
        width:dash/2,
        marginRight:dash/2,
        backgroundColor:'rgba(255,255,255,0.8)',
        height:1
    }
})
