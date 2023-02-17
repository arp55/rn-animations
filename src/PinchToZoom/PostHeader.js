import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

function PostHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>Walter Black</Text>
            <Icon name="ellipsis-horizontal-outline" size={18} color="gray"/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        paddingHorizontal:10,
        paddingVertical:5,
        flexDirection:'row',
        alignItems:"center"
    },
    name:{
        fontSize:17,
        flex:1
    }
})

export default PostHeader