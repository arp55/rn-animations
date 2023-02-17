// @flow
import * as React from 'react';
import {
  StyleSheet, Platform, Dimensions, View, Text,
} from 'react-native';
import Animated, { Extrapolate, interpolate, Value } from 'react-native-reanimated';

import {
  SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, PADDING, type Section,
} from './Model';


type LabelProps = {
  section: Section,
  index: number,
  x:Value;
  y:Value;
};

const { width, height } = Dimensions.get('window');
// Character width is 19.3 on iOS and 19 on Android
const charWidth = Platform.OS === 'ios' ? 19.3 : 19;
const fontSize = 32;
const fontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

export default class Label extends React.PureComponent<LabelProps> {
  render() {
    const {
      index, section, x, y
    } = this.props;
    const opacity=interpolate(x,{
      inputRange:index===0?[0,0,width]:[width*(index-1),width*index,width*(index+1)],
      outputRange:[.5,1,.5],
      extrapolate:Extrapolate.CLAMP
    })
    const labelWidth=interpolate(y,{
      inputRange:[0,height-MEDIUM_HEADER_HEIGHT],
      outputRange:[charWidth*section.title.length,width],
      extrapolate:Extrapolate.CLAMP
    })
    return (
      <Animated.View style={[styles.labelContainer,{opacity}]}>
        <Animated.Text style={[styles.label,{width:labelWidth}]}>{section.title.toUpperCase()}</Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: PADDING,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontSize,
    fontFamily,
  },
});
