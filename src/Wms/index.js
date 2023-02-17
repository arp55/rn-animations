import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import MapView, {
    Geojson,
  MAP_TYPES,
  Marker,
  ProviderPropType,
  WMSTile,
} from 'react-native-maps';
import Pin from '../Freeletics/components/Pin';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 24.88071707;
const LONGITUDE = -107.57856113;
const LATITUDE_DELTA = 0.152;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class WMSTiles extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isWMSTilesActive: false,
      data:null
    };
  }

    componentDidMount(){
        fetch('http://geoserver.dailybreathforecast.com/geoserver/Wildfire/wms?service=WFS&version=1.0.0&request=GetFeature&typeName=Wildfire%3AWildFires&maxFeatures=1000&outputFormat=application%2Fjson')
        .then(response=> response.json())
        .then(data => {console.log(data);this.setState({data})});
    }

  toggleWMSTiles() {
    this.setState({isWMSTilesActive: !this.state.isWMSTilesActive});
  }

  render() {
    const { region, data } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
        //   mapType={MAP_TYPES.SATELLITE}
          style={styles.map}
          initialRegion={region}
          >
          {this.state.isWMSTilesActive && (
            <WMSTile
              urlTemplate="http://geoserver.dailybreathforecast.com/geoserver/Wildfire/wms?service=WMS&request=GetMap&layers=SurfaceSmoke&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=512&height=512&srs=EPSG%3A3857&bbox=-10018754.171394622,2504688.542848655,-7514065.628545968,5009377.085697314"
              zIndex={1}
              opacity={0.5}
              tileSize={512}
            />
          )}
            {/* {data?
            <Geojson
                geojson={data} 
                strokeColor="green"
                fillColor="green"
                strokeWidth={2}
            />
            :null
            } */}
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text onPress={() => this.toggleWMSTiles()}>
              WMS Tiles: {this.state.isWMSTilesActive ? 'on' : 'off'} (click to
              toggle)
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

WMSTiles.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default WMSTiles;