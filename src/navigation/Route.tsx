import React from 'react';
import Login from '../screens/auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash/Splash';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default Route;
