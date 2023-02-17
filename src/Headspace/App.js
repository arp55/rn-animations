import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Progress from './components/Progress'

export default function App() {
    return (
        <View style={styles.container}>
            <Image source={require('./assets/bg.png')} style={styles.image} />
            <Progress />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        ...StyleSheet.absoluteFillObject
    }
})