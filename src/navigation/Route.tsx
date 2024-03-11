import React from 'react';
import Login from '../screens/auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash/Splash';
import BottomTabs from './BottomTabs';
import Otp from '../screens/createuser/Otp';
import RegisterPhoneNumberScreen from '../screens/createuser/RegisterPhoneNumberScreen';
import CompleteProfileScreen from '../screens/createuser/CompleteProfileScreen';
import Worker from '../screens/BecomeWorkerScreen/Worker';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="RegisterPhone" component={RegisterPhoneNumberScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="CreateWorkerProfile" component={Worker} />
    </Stack.Navigator>
  );
};

export default Route;
