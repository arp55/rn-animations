import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import MapView, {
  MAP_TYPES,
  PROVIDER_GOOGLE,
  UrlTile,
  WMSTile,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 63.5;
const LONGITUDE = 23.5;
const LATITUDE_DELTA = 0.152;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class WMSTiles extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      region: {
        latitude: 37.773972,
        longitude: -122.431297,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isWMSTilesActive: false,
    };
  }

  toggleWMSTiles() {
    this.setState({isWMSTilesActive: !this.state.isWMSTilesActive});
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
        //   provider={PROVIDER_GOOGLE}
        //   mapType={MAP_TYPES.SATELLITE}
          style={styles.map}
          initialRegion={region}
          >
          {this.state.isWMSTilesActive && (
            <UrlTile
                urlTemplate='http://38.130.208.236:8080/geoserver/gwc/service/tms/1.0.0/Wildfire%3ASurfaceSmoke@EPSG%3A900913@png/{z}/{x}/{y}.png'
                zIndex={-1}
                flipY={true}
            />
          )}
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

// WMSTiles.propTypes = {
//   provider: ProviderPropType,
// };

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