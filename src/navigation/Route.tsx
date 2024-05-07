import React from 'react';
import Login from '../screens/auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash/Splash';
import BottomTabs from './BottomTabs';
import Otp from '../screens/createuser/Otp';
import RegisterPhoneNumberScreen from '../screens/createuser/RegisterPhoneNumberScreen';
import CompleteProfileScreen from '../screens/createuser/CompleteProfileScreen';
import Worker from '../screens/BecomeWorkerScreen/Worker';
import WorkerProfile from '../screens/workerProfile/WorkerProfile';
import UpdateProfile from '../screens/update/UpdateProfile';
import ForgetPassword from '../screens/ForgetPassword/ForgetPasswordOtp';
import Onboarding from '../screens/onboarding/Onboarding';
import SignUp from '../screens/SignUp/SignUp';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="RegisterPhone" component={RegisterPhoneNumberScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="CreateWorkerProfile" component={Worker} />
      <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default Route;
