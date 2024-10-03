import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';

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
import SocialAuth from '../../components/SocialAuth/SocialAuth';
import navigationsString from '../../constants/navigation';
import messenging from '@react-native-firebase/messaging';

const Login = ({navigation}: {navigation: any}) => {
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {language} = useSelector((state: any) => state?.user);
  const [login] = useMutation(loginMutation);

  const securePass = async () => {
    setSecure(!secure);
  };

  useEffect(() => {
    const  getToken = async() => {
     let  FCMToken = await messenging().getToken();
     console.log(FCMToken , 'FCMToken')
    }
    getToken();
 
  }, [])
  


  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        message: 'email or password',
        description: 'email and  Password must be provieded .',
        type : 'danger',
        animated : true,
        icon : 'danger',
      });
      return;
    }
    try {
      setLoading(true)
      const res = await login({variables: {email : email?.trim(), password , fcmtoken : await messenging().getToken()}});
      const {user, error} = res.data?.login;
      if (user) {
        dispatch(setUser(user));
        dispatch(setToken(user.accessToken));
        const jsonValue = JSON.stringify(user.accessToken);
        await AsyncStorage.setItem('accessToken', jsonValue);
        navigation.replace(navigationsString.BOTTOMTABS);
      } else {
        showMessage({
          message : error?.message || "Something went wrong in auth.",
          description : "Please check username and password and try again",
          type : 'danger',
          animated : true,
          icon : 'warning',

        })
      }
      setLoading(false)
      } catch (error: any) {
        console.log(error, 'Inside error handling');
        console.log(error);
        setLoading(false)
    }
  };

  return (
    <View className="flex-1 justify-center bg-white  px-8 border-2">
      <Text className="font-[Poppins-Medium]  text-4xl  text-gray-900 leading-relaxed ">
        {language ? `अपने अकाउंट में लॉग इन करें` : `Login to your account`}
      </Text>
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
 
        <SocialAuth  login={true} navigation={navigation} setLoading={setLoading} loading ={loading}/>
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
