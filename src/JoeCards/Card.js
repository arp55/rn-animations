import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

type Props={
    card:{
        name:string;
        color:string;
        price:string;
    }
}

const {height}=Dimensions.get('window')

export const Card_Height=(height/3)
export const Card_Header=Card_Height/4
export const Card_Padding = 10;



export default function Card({card:{color,name,price}}:Props) {
    console.log('values')
    console.log(Card_Height);
    console.log(Card_Header)
    return (
        <View key={name} style={[styles.cardStyle,{ backgroundColor:color }]}>
            <Text style={{flex:1}}>{name}</Text>
            <Text style={{flex:1}}>{price}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    cardStyle:{
        height:Card_Height,
        borderRadius:10,
        flexDirection:'row',
        paddingHorizontal:6,
        paddingVertical:10
    }
})