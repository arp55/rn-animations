import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import _ from 'lodash'
import Selector from './Selector'

export const ROW_HEIGHT=100

type GraphProps={
    from:number;
    to:number;
}

export default class Graph extends Component<GraphProps,{}> {
    render() {
        const selectors={
            18:"Underweight",
            19:"Healthy weight",
            24:"Healthy weight",
            25:"Overweight",
            29:"Overweight",
            30:"Obese",
        }
        const {from,to}=this.props
        const iterations=to-from+1
        return (
            <View style={styles.container}>
                {
                    _.times(iterations).map((v,i)=>{
                        const BMI=from+i
                        return(
                            <React.Fragment key={i}>
                                {
                                    selectors[BMI]&&selectors[BMI+1]&&
                                    <Selector />
                                }
                                <View style={styles.row}>
                                    <Text style={styles.label}>BMI {BMI}</Text>
                                    {
                                        selectors[BMI]&&
                                        <Text style={[styles.selectorLabel,{alignSelf:selectors[BMI+1]?'flex-start':'flex-end'}]}>{selectors[BMI]}</Text>
                                    }
                                </View>
                            </React.Fragment>
                        )
                    }).reverse()
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#69d0fb'
    },
    row:{
        flexDirection:'row',
        height:ROW_HEIGHT,
        alignItems:'center',
        padding:10,
        justifyContent:'space-between'
    },
    label:{
        fontSize:16,
        color:'#fff'
    },
    selectorLabel:{
        fontSize:14,
        color:'rgba(255,255,255,0.8)'
    }
})
