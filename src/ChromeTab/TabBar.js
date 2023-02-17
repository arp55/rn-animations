import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

export const Tab_Bar_Width=150
export const Tab_Width=50
export const Tab_Height=40

export default function TabBar({backgroundColor,color,borderColor}) {
    return (
        <View style={[styles.tabBar,{backgroundColor}]}>
            <View style={[styles.tab1,{borderEndColor:borderColor}]}>
                <Icon style={{color}} name="eye-off-outline" size={32} />
            </View>
            <View style={[styles.tab2]}>
                <Feather style={{color}} name="grid" size={32} />
            </View>
            <View style={[styles.tab3,{borderStartColor:borderColor,borderTopStartRadius:0,borderBottomStartRadius:0,borderBottomEndRadius:10,borderTopEndRadius:10}]}>
                <Feather style={{color}} name="chrome" size={32} />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    tabBar:{
        flexDirection:'row',
        borderWidth:0,
        // borderColor:,
        width:Tab_Bar_Width,
        borderRadius:10
    },
    tab1:{
        borderEndWidth:1,
        // borderColor:'gray',
        borderRadius:10,
        borderBottomEndRadius:0,
        borderTopEndRadius:0,
        width:Tab_Width,
        height:Tab_Height,
        alignItems:'center',
        justifyContent:'center'
    },
    tab2:{
        borderWidth:0,
        borderBottomEndRadius:0,
        borderTopEndRadius:0,
        width:Tab_Width,
        height:Tab_Height,
        alignItems:'center',
        justifyContent:'center'
    },
    tab3:{
        borderStartWidth:1,
        // borderColor:'gray',
        borderRadius:10,
        borderBottomEndRadius:0,
        borderTopEndRadius:0,
        width:Tab_Width,
        height:Tab_Height,
        alignItems:'center',
        justifyContent:'center'
    }
})
