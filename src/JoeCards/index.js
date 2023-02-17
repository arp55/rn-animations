import React,{ Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Animated, Dimensions } from 'react-native'
import { debug } from 'react-native-reanimated';
// import { debug, interpolate, useCode, useValue, Value } from 'react-native-reanimated';
import Card, { Card_Header, Card_Height, Card_Padding } from './Card';

const {height}=Dimensions.get('window')

const cards = [
    {
        name: "Shot",
        color: "#a9d0b6",
        price: "30 CHF"
    },
    {
        name: "Juice",
        color: "#e9bbd1",
        price: "64 CHF"
    },
    {
        name: "Mighty Juice",
        color: "#eba65c",
        price: "80 CHF"
    },
    {
        name: "Sandwich",
        color: "#95c3e4",
        price: "85 CHF"
    },
    {
        name: "Combi",
        color: "#1c1c1c",
        price: "145 CHF"
    },
    {
        name: "Signature",
        color: "#a390bc",
        price: "92 CHF"
    },
    {
        name: "Coffee",
        color: "#fef2a0",
        price: "47 CHF"
    }
];


export default class App extends Component {
    state={
        y:new Animated.Value(0)
    }

    componentDidMount(){
        this.state.y.addListener(({value}) => {this._value = value;console.log(value)})
    }

    componentDidUpdate(){
        console.log(this.state.y._value)
    }

    render(){
        const { y } = this.state
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <View style={StyleSheet.absoluteFill}>
                        {cards.map((card,i)=>{
                            const inputRange=[-Card_Height,0]
                            const outputRange=[Card_Header*i,(Card_Height-Card_Header)*-i]
                            if(i>0){
                                inputRange.push(Card_Padding*i)
                                outputRange.push((Card_Height-Card_Padding)*-i)
                            }
                            const translateY=y.interpolate({
                                inputRange,
                                outputRange,
                                extrapolateRight:'clamp'
                            })

                            return(
                                <Animated.View key={i} style={{transform:[{translateY}]}}>
                                    <Card {...{card}} />
                                </Animated.View>
                            )
                        })}
                    </View>
                    <Animated.ScrollView 
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [
                                {
                                nativeEvent: {
                                    contentOffset: { y }
                                }
                                }
                            ],
                            { useNativeDriver: true }
                        )}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles=StyleSheet.create({
    root: {
      flex: 1,
      margin: 16
    },
    container:{
        flex:1,
    },
    content: {
        height: height * 2
    },
})
