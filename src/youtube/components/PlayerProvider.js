// @flow
import * as React from 'react';
import {
  View, StyleSheet, Dimensions, StatusBar,
} from 'react-native';
import Animated, { Easing, Extrapolate, interpolate, timing, Value } from 'react-native-reanimated';

import PlayerContext from './PlayerContext';
import VideoModal from './VideoModal';
import { type Video } from './videos';

const { height } = Dimensions.get('window');

type PlayerProviderProps = {
  children: React.Node,
};

type PlayerProviderState = {
  video: Video | null,
};

export default class PlayerProvider extends React.PureComponent<PlayerProviderProps, PlayerProviderState> {
  animation=new Value(0)

  state = {
    video: null,
  };

  setVideo = (video: Video | null) => {
    this.setState({ video }, this.toggleVideo);
  };

  toggleVideo=()=> timing(this.animation,{
      duration:300,
      toValue:1,
      easing:Easing.linear
    }).start()

  render() {
    const { setVideo } = this;
    const { children } = this.props;
    const { video } = this.state;

    const {animation}=this

    const translateY=interpolate(animation,{
      inputRange:[0,1],
      outputRange:[height,0],
      extrapolate:Extrapolate.CLAMP
    })

    return (
      <PlayerContext.Provider value={{ video, setVideo }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {children}
          </View>
          <Animated.View style={{transform:[{translateY}]}}>
            {
              video && <VideoModal {...{ video }} />
            }
          </Animated.View>
        </View>
      </PlayerContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
