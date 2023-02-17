// @flow
import * as React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import Headers from './Headers';
import Pages from './Pages';
import { SMALL_HEADER_HEIGHT } from './Model';
import Animated, { call, event, Value } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type SectionsProps = {
  sections: Section[],
};

const onScroll=({x,y}:{x?:Value,y?:Value})=>event([
    {
      nativeEvent:{
        contentOffset:{ x , y }
      }
    }
  ],
  {useNativeDriver:true}
)

export default class Sections extends React.PureComponent<SectionsProps> {
  constructor(props){
    super(props)
    this.x=new Value(0)
    this.y=new Value(0)
    this.onScrollX=onScroll({x:this.x})
    this.onScrollY=onScroll({y:this.y})
  }
  render() {
    const { sections } = this.props;
    const {x,y}=this
    return (
      <View style={styles.container}>
        <Animated.Code>
          {
            ()=>call([x,y],([x,y])=> console.log([x,y]))
          }
        </Animated.Code>
        <View>
          <Headers {...{ sections, x, y }} />
          <Pages {...{ sections, x, y }} />
        </View>
        <Animated.ScrollView 
          style={StyleSheet.absoluteFill}
          scrollEventThrottle={16}
          contentContainerStyle={{width:width*sections.length}}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          onScroll={this.onScrollX}
          snapToInterval={width}
          bounces={false}
        >
          <Animated.ScrollView 
            style={StyleSheet.absoluteFill}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{height:height+height-SMALL_HEADER_HEIGHT}}
            decelerationRate="fast"
            scrollEventThrottle={16}
            onScroll={this.onScrollY}
            bounces={false}
          />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
