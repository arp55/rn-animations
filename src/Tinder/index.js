// @flow
import React from "react";
import { Asset } from "expo-asset";

import { Profiles, type Profile } from "./components";
import { ActivityIndicator, Image } from "react-native";

const profiles: Profile[] = [
  {
    id: "1",
    name: "Caroline",
    age: 24,
    profile: require('./assets/profiles/1.jpg'),
  },
  {
    id: "2",
    name: "Jack",
    age: 30,
    profile: require('./assets/profiles/2.jpg'),
  },
  {
    id: "3",
    name: "Anet",
    age: 21,
    profile: require('./assets/profiles/3.jpg'),
  },
  {
    id: "4",
    name: "John",
    age: 28,
    profile: require('./assets/profiles/4.jpg'),
  },
];

type AppState = {
  ready: boolean,
};

export default class App extends React.Component<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    let preFetchTasks = []; 
    
    profiles.forEach((p)=>{
        Image.prefetch(String(p.profile),(res)=>{
            console.log("res",res)
            preFetchTasks.push(res)
        });
    });
    
    Promise.all(preFetchTasks).then((results)=>{
        console.log('val',preFetchTasks)
        let downloadedAll = true;
        results.forEach((result)=>{
            if(!result){
                downloadedAll = false;
            }
        })
    
        if(downloadedAll){
            this.setState({ready:true})
        }
    })
    // this.setState({ready:true})
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return (
        <ActivityIndicator size="large" color="blue" />
      );
    }
    return (
      <Profiles {...{ profiles }} />
    );
  }
}