import React ,{useState} from 'react'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { useTransition } from 'react-native-redash/lib/module/v1'
import Chevron from './Chevron'

const list=[
    {name:"tata",price:"$20"},
    {name:"jindal",price:"$12"},
    {name:"aditya birla",price:"$34"},
    {name:"kotak",price:"$23"},
    {name:"mahindra",price:"$15"}
]

const LIST_ITEM_HEIGHT=10

const {width}=Dimensions.get("screen")

function List({btn,i}) {
    const [open, setOpen] = useState(false)
    const transition=useTransition(open,open?0:1,open?1:0,400,Easing.linear)
    const height=interpolate(transition,{
        inputRange:[0,1],
        outputRange:[0,LIST_ITEM_HEIGHT*list.length]
    })
    const bottomRadius=interpolate(transition,{
        inputRange:[0,1],
        outputRange:[10,0]
    })
    return (
        <View key={i} style={styles.constainer}>
            <TouchableWithoutFeedback style={styles.pointBtn} onPress={()=>setOpen(!open)}>
                <Animated.View style={[styles.pointView,{borderBottomLeftRadius:bottomRadius,borderBottomRightRadius:bottomRadius}]}>
                    <Text style={styles.btnText}>
                        {btn}
                    </Text>
                    <Chevron open={open} transition={transition} />
                </Animated.View>
            </TouchableWithoutFeedback>
            <View style={styles.listContainer}>
                {list.map((item,index)=>{
                    return(
                        <Animated.View style={[styles.list,{height}]} key={index}>
                            <View style={styles.listIn}>
                                <Text>
                                    {item.name}
                                </Text>
                            </View>
                        </Animated.View>
                    )
                })}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    constainer:{
        paddingHorizontal:20,
        paddingVertical:20
    },
    pointBtn:{
        flexDirection:'row'
    },
    pointView:{
        flexDirection:'row',
        alignItems:'center',
        width:width*0.85,
        backgroundColor:'#dddbdb',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:5
    },
    btnText:{
        flex:2,
        fontSize:18
    },
    // listContainer:{
    //     borderBottomLeftRadius:40,
    //     backgroundColor:'#dddbdb',
    //     borderBottomRightRadius:40,
    // },
    list:{
        width:width*0.85,
        backgroundColor:'#dddbdb',
        // borderBottomLeftRadius:40,
        // borderBottomRightRadius:40,
    },
    listIn:{
        paddingHorizontal:10,
        paddingVertical:5
    }
})

export default List