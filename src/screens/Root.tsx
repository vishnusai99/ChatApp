import React, {useEffect, useState} from 'react';
import Signin from './login/Signin';
import Main from './Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Booting from './Booting';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

const Root = () => {
  const [isSignedIn, setIsSignedin] = useState<boolean>();
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    if (user) setIsSignedin(true);
    else setIsSignedin(false);
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (isSignedIn === undefined)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  return (
    <Stack.Navigator
      initialRouteName={isSignedIn === true ? 'Main' : 'Signin'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Animation" component={Booting} />
    </Stack.Navigator>
  );
};

export default Root;
