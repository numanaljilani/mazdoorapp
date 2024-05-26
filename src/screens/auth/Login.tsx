import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';

import InputText from '../../components/Input/InputText';
import icons from '../../constants/icons';
import {useMutation} from '@apollo/client';

import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import {loginMutation} from '../../graphql/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken, setUser} from '../../service/slice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import Button from '../../components/common/Button';
import images from '../../constants/images';
import SocialAuth from '../../components/SocialAuth/SocialAuth';
import navigationsString from '../../constants/navigation';

const Login = ({navigation}: {navigation: any}) => {
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [error, setError] = useState<any>();
  const [secure, setSecure] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {userData, token, language} = useSelector((state: any) => state?.user);
  const [login, {data, loading}] = useMutation(loginMutation);

  const securePass = async () => {
    setSecure(!secure);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        type: 'danger',
        message: 'email and Password is requred',
        description: 'email and  Password must be provieded .',
      });
      return;
    }
    try {
      // navigation.navigate("BottomTabs")
      const res = await login({variables: {email, password}});
      const {user, error} = res.data?.login;
      console.log(user, error, '?>>>>>>');
      if (user) {
        dispatch(setUser(user));
        dispatch(setToken(user.access_token));
        const jsonValue = JSON.stringify(user.accessToken);
        await AsyncStorage.setItem('accessToken', jsonValue);
        navigation.replace(navigationsString.BOTTOMTABS);
      } else {
        showMessage({
          type: 'danger',
          message: 'Something went wrong',
        });
      }

      // if (user) {
      //   dispatch(setUser(user));
      //   dispatch(setToken(user.access_token));
      //   const jsonValue = JSON.stringify(user.access_token);
      //   await AsyncStorage.setItem('token', jsonValue);
      //   navigation.replace('BottomTabs');
      //   showMessage({
      //     type: 'success',
      //     message: 'Login successfull',
      //     description: 'Welcome to mazdoor',
      //   });
      //   return;
      // }
      // if (error) {
      //   showMessage({
      //     type: 'danger',
      //     message: 'Invalid Password',
      //     description: error.message,
      //   });
      //   return;
      // }
      // if(data?.login){
      //   await AsyncStorage.setItem('token', data?.login?.acess_token);
      //   dispatch(setToken(data?.login?.acess_token));
      // }
    } catch (error: any) {
      console.log(error, 'Inside error handling');
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white  px-8 border-2">
      {/* <View>
        <Text className="text-4xl font-semibold leading-relaxed text-[#312651]">
          {language ? `आपका पुनः` :`Welcome`}
        </Text>
        <Text className="text-4xl font-semibold leading-relaxed text-[#FF7754]">
          {language ? `स्वागत है`:`back !`}
        </Text>
      </View> */}
      <Text className="font-[Poppins-Medium]  text-4xl  text-gray-900 leading-relaxed ">
        {language ? `अपने अकाउंट में लॉग इन करें` : `Login to your account`}
      </Text>

      {/* <View className="py-3">
        <Text className=" text-sm leading-5">
          {language
            ? 'दक्ष कामगारों से आसानी से जुड़ें और हमारे यूजर-फ्रेंडली लॉगिन के माध्यम से उन्हें खोजें।'
            : `Connect with skilled workers easily. Find the right talent through our
          user-friendly login for labor seekers`}
        </Text>
      </View> */}
      <View className="w-full gap-y-4 ">
        <InputText
          label={language ? 'फ़ोन' : 'Email'}
          value={email}
          setData={setEmail}
          icon={icons.email}
          keyboard={true}
        />
        <InputText
          label={language ? 'पासवर्ड' : 'Password'}
          value={password}
          setData={setPassword}
          icon={icons.password}
          keyboard={true}
          secure={true}
          right={secure ? icons.show : icons.hide}
          securePass={securePass}
          pass={!secure}
        />

        {/* <TouchableOpacity
          className="bg-[#312651] w-full py-3 rounded-xl"
          onPress={handleLogin}>
          <Text className="text-white text-center text-lg font-medium">
            {language ? `लॉग इन करें` : `Login`}
          </Text>
</TouchableOpacity> */}
        <Button
          onPressFunction={handleLogin}
          text={language ? `लॉग इन करें` : `Login`}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassword')}
          className=" justify-center items-center py-4">
          <Text className="text-[#822BFF] font-[Poppins-Medium]  tracking-wider">
            {language ? `पासवर्ड भूल गए` : `Forget the password ?`}
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-x-2 justify-center items-center">
          <View className="border-t-2 border-gray-200 flex-1" />
          <Text className="text-gray-500 font-[Poppins-Medium]  tracking-wide text-sm">
            {language ? `या जारी रखें` : `Or continue with`}
          </Text>
          <View className="border-t-2 border-gray-200  flex-1" />
        </View>
        {/* <View className=" w-full py-3 rounded-lg border-2 border-[#312651] "> */}
        {/* <TouchableOpacity className="text-[#83829A] text-center text-lg font-medium justify-center items-center flex-row gap-2">
            <Image  source={images.Google} className='w-8 h-8'/>
            <Text className="text-[#83829A] text-center text-lg font-medium ">
              Continue with google
            </Text>
            
      
keytool -exportcert -alias androiddebugkey -keystore "C:\Users\numan\.android\debug.keystore" | openssl sha1 -binary | openssl base64
      

          </TouchableOpacity> */}
        {/* <TouchableOpacity
            className="text-center text-lg font-medium justify-center items-center flex-row gap-2"
            onPress={() => navigation.navigate('Registeremail')}>
            <Text className="text-[#312651] text-center text-lg font-medium ">
              {language ? `साइन अप करें` :`Sign Up`}
            </Text>
          </TouchableOpacity> */}
        {/* </View> */}

        <SocialAuth />
      </View>
      <View className="  mt-8">
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-center text-gray-500 font-[Poppins-Medium]">
            {language ? `कोई खाता नहीं है?` : `Don't have an account ?`}{' '}
            <Text className=" text-[#822BFF] tracking-wider font-[Poppins-Medium]">
              {language ? `साइन अप करें` : `Sign up`}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicatorComponent />}
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  background: {
    //      flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // paddingVertical: 20,
  },
  container: {
    // marginVertical: 20,
    // marginHorizontal: 20,
  },
});
