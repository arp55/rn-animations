// @flow
/* eslint-disable global-require */
import React from 'react';
// import { AppLoading, Asset } from 'expo';

import { Home, PlayerProvider, videos } from './components';
import { ActivityIndicator, Image } from 'react-native';

type AppState = {
  ready: boolean,
};

export default class App extends React.PureComponent<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    // await Promise.all(
    //   videos.map(video => Promise.all([
    //     Asset.loadAsync(video.video),
    //     Asset.loadAsync(video.avatar),
    //     Asset.loadAsync(video.thumbnail),
    //   ])),
    // );
    let imgUrls=[]
    let thumbUrls=[]
    videos.map(video=>{
      Image.prefetch(String(video.avatar),(res)=>imgUrls.push(res))
      Image.prefetch(String(video.thumbnail),(res)=>thumbUrls.push(res))
    })

    Promise.all(imgUrls,thumbUrls).then(()=>{
        let downloadedAll=true
        console.log(imgUrls)

        imgUrls.map(res=>{
          if(!res){
              downloadedAll=false
          }
        })

        thumbUrls.map(res=>{
          if(!res){
            downloadedAll=false
          }
        })

        if(downloadedAll){
            this.setState({ready:true})
        }
    })
    .catch(err=>console.log(err))
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return (
        <ActivityIndicator size="large" color="blue" />
      );
    }
    return (
      <PlayerProvider>
        <Home />
      </PlayerProvider>
    );
  }
}
