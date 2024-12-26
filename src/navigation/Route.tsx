import React, { useEffect } from 'react';
import Login from '../screens/auth/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/splash/Splash';
import BottomTabs from './BottomTabs';
import Otp from '../screens/createuser/Otp';
import RegisterPhoneNumberScreen from '../screens/createuser/RegisterPhoneNumberScreen';
import CompleteProfileScreen from '../screens/createuser/CompleteProfileScreen';
import Worker from '../screens/BecomeWorkerScreen/Worker';
import ForgetPassword from '../screens/ForgetPassword/ForgetPasswordOtp';
import Onboarding from '../screens/onboarding/Onboarding';
import SignUp from '../screens/SignUp/SignUp';
import HelpCenter from '../screens/ProfielSubScreens/HelpCenter';
import navigationString from "../constants/navigation"
import WorkDetails from '../screens/details/WorkDetails';
import Booking from '../screens/booking/BookingDetails';
import NotFound from '../components/notFound/NotFound';
import Searchh from '../screens/search/Searchh';
import MyBooking from '../screens/booking/MyBooking';
import WorkDetailsInput from '../screens/details/WorkDetailsInput';
import ContractorListScreen from '../screens/Contractor/ContractorListScreen';
import BookMarks from '../screens/Bookmarks/BookMarks';
import MoreSerices from '../screens/MoreService/MoreSerices';
import UpdateProfile from '../screens/UpdateProfile/UpdateProfile';
import Privacy from '../screens/PrivacyPolicy/Privacy';
import Notification from '../screens/Notification/Notification';
import Security from '../screens/security/Security';
import OtpScreen from '../screens/otp/Otp';
import ResetPassword from '../screens/resetpassword/ResetPassword';
import SubCategories from '../screens/subCategories/SubCategories';
import { useNavigation } from '@react-navigation/native';

import dynamicLinks from '@react-native-firebase/dynamic-links';

const Stack = createStackNavigator();



const Route = ({}) => {

  const HandleDeepLinking = () => {
    const {navigate} : any = useNavigation()
    const handleDynamicLinks = async (link : any ) => {
      console.log('Foreground link handling:', link)
      let productId = link.url.split('=').pop()
      console.log('productId:', productId,)
        navigate('WorkDetails', { productId: productId })
    }
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
      return () => unsubscribe()
    }, [])

    return null
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
      
      >
      {/* new */}
      <Stack.Screen name={navigationString.CONTRACTORDETAILS} component={WorkDetails} />
      <Stack.Screen name="MyBooking" component={MyBooking} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="NotFound" component={NotFound} />
      <Stack.Screen name="Searchh" component={Searchh} />
      <Stack.Screen  name={navigationString.CREATECONTRACTOR}  component={WorkDetailsInput} />
      {/* new */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="Signup" component={SignUp} />
      {/* <Stack.Screen name="Otp" component={OtpScreen} /> */}
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="RegisterPhone" component={RegisterPhoneNumberScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="CreateWorkerProfile" component={Worker} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name={navigationString.HELPCENTER} component={HelpCenter} />
      <Stack.Screen name={navigationString.CONTRACTORLIST} component={ContractorListScreen} />
      <Stack.Screen name={navigationString.MYBOOKMARKS} component={BookMarks} />
      <Stack.Screen name={navigationString.MORESERVICES} component={MoreSerices} />
      <Stack.Screen name={navigationString.UPDATEPROFILE} component={UpdateProfile} />
      <Stack.Screen name={navigationString.PRIVACY} component={Privacy} />
      <Stack.Screen name={navigationString.SUBCATEGORIES} component={SubCategories} />
      <Stack.Screen name={navigationString.BOOK} component={Booking} />
      <Stack.Screen name={navigationString.NOTIFICATION} component={Notification} />
      <Stack.Screen name={navigationString.CHANGEPASSWORD} component={Security} />
    </Stack.Navigator>
  );
};

export default Route;
