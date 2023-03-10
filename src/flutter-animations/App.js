// @flow
import React from 'react';
import { ActivityIndicator, Image } from 'react-native';

import { Sections, type Section } from './components';

const mariner = '#3B5F8F';
const mediumPurple = '#8266D4';
const tomato = '#F95B57';
const mySin = '#F3A646';

const sections: Section[] = [
  {
    title: 'SUNGLASSES',
    leftColor: mediumPurple,
    rightColor: mariner,
    image: require('./assets/sunnies.png'),
  },
  {
    title: 'FURNITURE',
    leftColor: tomato,
    rightColor: mediumPurple,
    image: require('./assets/table.png'),
  },
  {
    title: 'JEWELRY',
    leftColor: mySin,
    rightColor: tomato,
    image: require('./assets/earrings.png'),
  },
  {
    title: 'HEADWEAR',
    leftColor: 'white',
    rightColor: tomato,
    image: require('./assets/hat.png'),
  },
];

export default class App extends React.Component<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    // await Promise.all(sections.map(section => Asset.loadAsync(section.image)));
    // this.setState({ ready: true });
    let imgUrls=[]
    sections.map(section=>{
      Image.prefetch(String(section.image),(res)=>{imgUrls.push(res)})
    })

    Promise.all(imgUrls).then((resp)=>{
        let downloadedAll=true
        console.log(resp)

        imgUrls.map(res=>{
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
        <ActivityIndicator size='large' color="blue" />
      );
    }
    return (
      <Sections {...{ sections }} />
    );
  }
}
