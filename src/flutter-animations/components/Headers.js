// @flow
import * as React from 'react';
import { View, Dimensions } from 'react-native';

import {
  type Section, SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, PADDING, CURSOR_WIDTH,
} from './Model';
import Header from './Header';
import Label from './Label';
import Cursor from './Cursor';
import Animated, { add, Extrapolate, interpolate, multiply } from 'react-native-reanimated';

type HeadersProps = {
  sections: Section[],
  x:Value;
  y:Value;
};

const backgroundColor = '#343761';
const { width, height } = Dimensions.get('window');

export default class Headers extends React.PureComponent<HeadersProps> {
  getStyle=(headerHeight,key)=>{
    const { sections, x, y } = this.props;
    const FULL_HEADER_HEIGHT = height / sections.length;
    const translateY=interpolate(y,{
      inputRange:[0,height-MEDIUM_HEADER_HEIGHT+100],
      outputRange:[key * FULL_HEADER_HEIGHT,0],
      extrapolate:Extrapolate.CLAMP
    });
    const translateX1=interpolate(y,{
      inputRange:[0,height-MEDIUM_HEADER_HEIGHT+100],
      outputRange:[x,key*width],
      extrapolate:Extrapolate.CLAMP
    })
    const translateX2= multiply(x,-1)
    const translateX=add(translateX1,translateX2)
    return {
      position: 'absolute',
      top: 0, 
      left: 0, 
      height: headerHeight,
      width,
      transform:[
        {translateY},
        {translateX}
      ]
    }
  }
  render() {
    const { sections, x, y } = this.props;
    const FULL_HEADER_HEIGHT = height / sections.length;
    const headerHeight=interpolate(y,{
      inputRange:[0,height-MEDIUM_HEADER_HEIGHT,height-SMALL_HEADER_HEIGHT],
      outputRange:[FULL_HEADER_HEIGHT,MEDIUM_HEADER_HEIGHT,SMALL_HEADER_HEIGHT],
      extrapolate:Extrapolate.CLAMP
    })
    return (
      <View style={{ height, width: sections.length * width, backgroundColor }}>
        {
          sections.map((section, key) => {
            const style=this.getStyle(headerHeight,key)
            return (
              <Animated.View
                {...{ key,style }}
              >
                <Header index={key} {...{ section }} />
              </Animated.View>
            )
          })
        }
        {
          sections.map((section, key) => {
            const style=this.getStyle(headerHeight,key)
            return (
              <Animated.View
                {...{ key,style }}
              >
                <Label index={key} {...{ section, x, y }} />
              </Animated.View>
            )
          })
        }
        {
          sections.map((section, key) => {
            const translateX1=interpolate(y,{
              inputRange:[0,height-MEDIUM_HEADER_HEIGHT],
              outputRange:[-width/2+CURSOR_WIDTH/2+PADDING,0],
              extrapolate:Extrapolate.CLAMP
            })
            const translateX2=interpolate(y,{
              inputRange:[0,height-MEDIUM_HEADER_HEIGHT,height-FULL_HEADER_HEIGHT],
              outputRange:[0,width/2*key,(CURSOR_WIDTH+PADDING)*key-width/4],
              extrapolate:Extrapolate.CLAMP
            })
            const translateX=add(translateX1,translateX2)
            const opacity=interpolate(x,{
              inputRange:key===0?[0,0,width]:[width*(key-1),width*key,width*(key+1)],
              outputRange:[.5,1,.5],
              extrapolate:Extrapolate.CLAMP
            })  
            const translateY=interpolate(y,{
              inputRange:[0,height-MEDIUM_HEADER_HEIGHT],
              outputRange:[multiply(headerHeight,key),0],
              extrapolate:Extrapolate.CLAMP
            })
            const style= {
              position: 'absolute',
              top: 0, 
              left: 0, 
              height: headerHeight,
              width,
              opacity,
              transform:[
                {translateY},
                {translateX}
              ]
            }
            return (
              <Animated.View
                {...{ key,style }}
              >
                <Cursor index={key} {...{ section, x, y }} />
              </Animated.View>
            )
          })
        }
      </View>
    );
  }
}
