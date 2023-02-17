import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

function PostFooter() {
    return (
        <View style={styles.container}>
            <View style={{flex:1,flexDirection:'row'}}>
                <Icon style={styles.icon} name="heart-outline" size={24} color="gray"/>
                <Icon style={styles.icon} name="chatbubble-outline" size={22} color="gray"/>
            </View>
            <View style={{flex:1,flexDirection:'row-reverse'}}>
                <Icon style={styles.icon} name="bookmark-outline" size={22} color="gray"/>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        paddingHorizontal:10,
        paddingVertical:8,
        flexDirection:'row',
        alignItems:"center"
    },
    name:{
        fontSize:17,
        flex:1
    },
    icon:{
        paddingHorizontal:12
    }
})

export default PostFooter