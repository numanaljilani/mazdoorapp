import React from 'react';
import Login from '../screens/auth/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/splash/Splash';
import BottomTabs from './BottomTabs';
import Otp from '../screens/createuser/Otp';
import RegisterPhoneNumberScreen from '../screens/createuser/RegisterPhoneNumberScreen';
import CompleteProfileScreen from '../screens/createuser/CompleteProfileScreen';
import Worker from '../screens/BecomeWorkerScreen/Worker';
import WorkerProfile from '../screens/workerProfile/WorkerProfile';
// import UpdateProfile from '../screens/update/UpdateProfile';
import ForgetPassword from '../screens/ForgetPassword/ForgetPasswordOtp';
import Onboarding from '../screens/onboarding/Onboarding';
import SignUp from '../screens/SignUp/SignUp';
import HelpCenter from '../screens/ProfielSubScreens/HelpCenter';
import navigationString from "../constants/navigation"
import WorkDetails from '../screens/details/WorkDetails';
import Booking from '../screens/booking/BookingDetails';
import NotFound from '../components/notFound/NotFound';
import Search from '../screens/search/Search';
import Searchh from '../screens/search/Searchh';
import FilterModal from '../components/filter/FilterModal';
import MyBooking from '../screens/booking/MyBooking';
import WorkDetailsInput from '../screens/details/WorkDetailsInput';
import ContractorListScreen from '../screens/Contractor/ContractorListScreen';
import BookMarks from '../screens/Bookmarks/BookMarks';
import MoreSerices from '../screens/MoreService/MoreSerices';
import UpdateProfile from '../screens/UpdateProfile/UpdateProfile';
import Privacy from '../screens/PrivacyPolicy/Privacy';


const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      {/* new */}
      <Stack.Screen name="WorkDetails" component={WorkDetails} />
      <Stack.Screen name="MyBooking" component={MyBooking} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="NotFound" component={NotFound} />
      <Stack.Screen name="Searchh" component={Searchh} />
      {/* <Stack.Screen name="FilterModal" component={FilterModal} /> */}
      <Stack.Screen name="WorkDetailsInput" component={WorkDetailsInput} />
      {/* new */}
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
      {/* <Stack.Screen name="UpdateProfile" component={UpdateProfile} /> */}
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name={navigationString.HELPCENTER} component={HelpCenter} />
      <Stack.Screen name={navigationString.CONTRACTORLIST} component={ContractorListScreen} />
      <Stack.Screen name={navigationString.MYBOOKMARKS} component={BookMarks} />
      <Stack.Screen name={navigationString.MORESERVICES} component={MoreSerices} />
      <Stack.Screen name={navigationString.UPDATEPROFILE} component={UpdateProfile} />
      <Stack.Screen name={navigationString.PRIVACY} component={Privacy} />
    </Stack.Navigator>
  );
};

export default Route;
