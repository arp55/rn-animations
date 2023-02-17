import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Story extends Component {
    render() {
        const {story:{url}}=this.props
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image source={{uri:url}} style={styles.img} />
                </View>
                <View style={styles.footer}>
                    <Icon style={{flex:1,textAlign:'center'}} name="camera-outline" size={28} color="#CECECE" />
                    <Icon style={{flex:1,textAlign:'center'}} name="send-outline" size={28} color="#CECECE" />
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginVertical:15,
    },
    img:{
        ...StyleSheet.absoluteFillObject,
        height:null,
        width:null,
    },
    footer:{
        flexDirection:'row',
    }
})