import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Run from './components/Run';

type AppState={
    latitude:number;
    longitude:number;
    timestamp:number;
    ready:boolean;
}

export default class App extends Component<{},AppState> {
    state={
        ready:false
    }

    componentDidMount(){
        Geolocation.getCurrentPosition(location => {
            const {coords:{latitude,longitude},timestamp}=location
            this.setState({ready:true,latitude,longitude,timestamp})
        });
    }

    render() {
        const { ready,latitude,longitude, timestamp }=this.state
        return (
            <View style={styles.container}>
                {
                    ready&&
                    <Run totalDistance={1000} {...{latitude,longitude,timestamp}} />
                }
                {
                    !ready &&
                    <ActivityIndicator size="large" color="blue" />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#29252b'
    }
})