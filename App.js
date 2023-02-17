import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Swiper from './src/Swiper/Swiper';
import Wallet from './src/Wallet/Wallet';
import FlatWallet from './src/FlatList/Wallet';
import Button from './src/AnimatedButton/Button';
import Accordion from './src/AnimatedList/Accordion';
import Pinch from './src/PinchToZoom/Pinch';
import Tinder from './src/Tinder';
import Stories from './src/Stories';
import Youtube from './src/youtube/App';
import Cards from './src/JoeCards';
import Pan from './src/PanGesture/Pan';
import Chrome from './src/ChromeTab';
import SoundCloud from './src/SoundCloud';
import Flutter from './src/flutter-animations/App';
import Snapchat from './src/Snapchat/App';
import Revolut from './src/RevolutChart/App';
import Headspace from './src/Headspace/App';
import Freeletics from './src/Freeletics';
import Withings from './src/WithingsHealth';
import Wms from './src/Wms';

const comps = [
  {key: 1, name: 'Swiper', comp: 'Swiper'},
  {key: 2, name: 'Wallet', comp: 'Wallet'},
  {key: 3, name: 'FlatList Wallet', comp: 'FlatWallet'},
  {key: 4, name: 'Animated Button', comp: 'AnimatedBtn'},
  {key: 5, name: 'Animated List', comp: 'AnimatedList'},
  {key: 6, name: 'Pinch To Zoom', comp: 'PinchZoom'},
  {key: 7, name: 'Tinder', comp: 'Tinder'},
  {key: 8, name: 'Stories', comp: 'Stories'},
  {key: 9, name: 'Youtube', comp: 'Youtube'},
  {key: 10, name: 'Cards', comp: 'Cards'},
  {key: 11, name: 'Pan', comp: 'Pan'},
  {key: 12, name: 'Chrome', comp: 'Chrome'},
  {key: 13, name: 'SoundCloud', comp: 'SoundCloud'},
  {key: 14, name: 'Flutter Animations', comp: 'Flutter'},
  {key: 15, name: 'Snapchat Discovery', comp: 'Snapchat'},
  {key: 16, name: 'Revolut Charts', comp: 'Revolut'},
  {key: 17, name: 'Headspace Circle', comp: 'Headspace'},
  {key: 18, name: 'Freeletics Running', comp: 'Freeletics'},
  {key: 19, name: 'Withings Health mate', comp: 'Withings'},
  {key: 20, name: 'Wms', comp: 'Wms'},
];

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {comps.map(cp => {
          return (
            <TouchableOpacity
              style={styles.button}
              key={cp.key}
              onPress={() => navigation.navigate(cp.comp)}>
              <Text style={styles.buttonText}>{cp.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Swiper" component={Swiper} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="FlatWallet" component={FlatWallet} />
        <Stack.Screen name="AnimatedBtn" component={Button} />
        <Stack.Screen name="AnimatedList" component={Accordion} />
        <Stack.Screen name="PinchZoom" component={Pinch} />
        <Stack.Screen name="Tinder" component={Tinder} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="Youtube" component={Youtube} />
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="Pan" component={Pan} />
        <Stack.Screen name="Chrome" component={Chrome} />
        <Stack.Screen name="SoundCloud" component={SoundCloud} />
        <Stack.Screen name="Flutter" component={Flutter} />
        <Stack.Screen name="Snapchat" component={Snapchat} />
        <Stack.Screen name="Revolut" component={Revolut} />
        <Stack.Screen name="Headspace" component={Headspace} />
        <Stack.Screen name="Freeletics" component={Freeletics} />
        <Stack.Screen name="Withings" component={Withings} />
        <Stack.Screen name="Wms" component={Wms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#C3C3C3',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 3,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default App;
