import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Monitor from './Monitor';
import * as turf from '@turf/turf'
import Pin from './Pin';

type RunProps={
    totalDistance:number;
    latitude: number;
    longitude:number;
    timestamp:number;
}

// type Position={
//     t
// }

type RunState={
    positions:any[];
    distance:number;
    pace:number;
}

const { width }=Dimensions.get('window')

export default class Run extends Component<RunProps,RunState> {
    map=React.createRef()

    state={
        positions:[],
        distance:0,
        pace:0
    }

    componentDidMount(){
        const options={
            timeout:1000,
            enableHighAccuracy:true,
            distanceFilter:1
        }
        this.listener=Geolocation.watchPosition(this.onPositionChange, ()=>console.log('failed'), options);
    }

    componentWillUnmount(){
        Geolocation.clearWatch(this.listener)
    }

    distanceBetween(origin,destination){
        var from = turf.point([origin.longitude, origin.latitude]);
        var to = turf.point([destination.longitude, destination.latitude]);
        var options = {units: 'meters'};
        var distance = Math.round(turf.distance(from, to, options))
        console.log(distance)
        return distance
    }

    computePace=(delta,prevPosition,position)=>{
        console.log(position.timestamp)
        console.log(prevPosition)
        console.log(prevPosition.timestamp)
        const time=position.timestamp-prevPosition.timestamp
        const pace= (delta/time).toFixed(2)
        return pace
    }

    onPositionChange=(position)=>{
        const {latitude,longitude,timestamp}=this.props
        this.map.current.animateToRegion({...position.coords,latitudeDelta: 0.001,longitudeDelta: 0.01})
        const lastPosition=this.state.positions.length===0?{coords:{latitude,longitude},timestamp}:this.state.positions[this.state.positions.length-1]
        const delta=this.distanceBetween(lastPosition.coords,position.coords)
        const pace=delta>0?this.computePace(delta,lastPosition,position):0
        this.setState({positions:[...this.state.positions,position],distance:this.state.distance+delta,pace})
    }
    
    render() {
        const { positions, distance,pace }=this.state
        const {latitude,longitude,totalDistance}=this.props
        const currentPosition= positions.length===0?{coords:{latitude,longitude}}:positions[positions.length-1]
        const initial={
            latitudeDelta: 0.001,
            longitudeDelta: 0.01,
            ...currentPosition.coords
        }
        return (
            <View style={styles.container}>
                <View style={{flex:0.39}}>
                    <Monitor {...{distance,pace,totalDistance}} />
                </View>
                <MapView ref={this.map} style={styles.map} initialRegion={initial}>
                    <Marker coordinate={currentPosition.coords} anchor={{x:0.5,y:0.5}}>
                        <Pin />
                    </Marker>
                    <Polyline coordinates={positions.map(position=>position.coords)} strokeColor="#f2b659" strokeWidth={10} />
                </MapView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    map:{
        flex:0.61,
        width
    }
})
