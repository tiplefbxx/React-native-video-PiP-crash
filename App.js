import React, {useCallback, useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import Player from './src/components/Player';
import {NavigationContainer} from '@react-navigation/native';

const NativeNav = createNativeStackNavigator();

const WrapperApp = () => {
  return (
    <NavigationContainer>
      <NativeNav.Navigator
        initialRouteName="Player"
        screenOptions={{header: () => {}}}>
        <NativeNav.Screen component={App} name="Player" />
      </NativeNav.Navigator>
    </NavigationContainer>
  );
};

const firstMedia = require('./broadchurch.mp4');
const secondMedia = require('./billy.mp4');

const App = () => {
  const [media, setMedia] = useState(firstMedia);
  const [isCrashVariant, setIsCrashVariant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onEnd = useCallback(() => {
    setMedia(secondMedia);

    if (isCrashVariant) {
      setIsLoading(true);
    }
  }, [isCrashVariant]);

  useEffect(() => {
    if (isLoading && isCrashVariant) {
      setIsLoading(false);
    }
  }, [isLoading, isCrashVariant]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.textStyle}>App will die when autoplay in PiP</Text>
      <Text style={isCrashVariant ? styles.active : styles.disabled}>
        {isCrashVariant ? 'ON' : 'OFF'}
      </Text>
      <Button
        title={'Press me bro to setup crash behaviour'}
        onPress={() => setIsCrashVariant(!isCrashVariant)}
      />
      {!isLoading && <Player src={media} onEnd={onEnd} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  textStyle: {
    color: 'black',
    paddingTop: 30,
    fontSize: 20,
  },
  active: {
    fontSize: 30,
    color: 'green',
  },
  disabled: {
    fontSize: 30,
    color: 'red',
  },
});

export default WrapperApp;
