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

const ResetPassword = ({navigation}: any) => {
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpassword, setCPassword] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(false);
  const [csecure, setCSecure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {language} = useSelector((state: any) => state?.user);
  const [login] = useMutation(loginMutation);

  const securePass = async () => {
    setSecure(!secure);
  };
  const csecurePass = async () => {
    setCSecure(!csecure);
  };

  useEffect(() => {
    const getToken = async () => {
      let FCMToken = await messenging().getToken();
      console.log(FCMToken, 'FCMToken');
    };
    getToken();
  }, []);

  const changePassword = async () => {
    if (password != cpassword) {
      showMessage({
        message: 'Please check your password',
        description: 'password and confirm password doesnt match.',
        type: 'danger',
        animated: true,
        icon: 'danger',
      });
      return;
    }
    //   try {
    //     setLoading(true)
    //     const res = await login({variables: {email : email?.trim(), password , fcmtoken : await messenging().getToken()}});
    //     const {user, error} = res.data?.login;
    //     if (user) {
    //       dispatch(setUser(user));
    //       dispatch(setToken(user.accessToken));
    //       const jsonValue = JSON.stringify(user.accessToken);
    //       await AsyncStorage.setItem('accessToken', jsonValue);
    //       navigation.replace(navigationsString.BOTTOMTABS);
    //     } else {
    //       showMessage({
    //         message : error?.message || "Something went wrong in auth.",
    //         description : "Please check username and password and try again",
    //         type : 'danger',
    //         animated : true,
    //         icon : 'warning',

    //       })
    //     }
    //     setLoading(false)
    //     } catch (error: any) {
    //       console.log(error, 'Inside error handling');
    //       console.log(error);
    //       setLoading(false)
    //   }
    navigation.navigate('Login')
  };
  return (
    <View className="flex-1 justify-center bg-white  px-8 border-2">
      <Text className="font-[Poppins-Medium]  text-4xl  text-gray-900 leading-relaxed ">
        {language ? `कृपया अपना पासवर्ड रीसेट करें` : `Please reset your password`}
      </Text>
      <View className="w-full gap-y-4 ">

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
        <InputText
          label={language ? 'पासवर्ड की पुष्टि कीजिये' : 'Confirm Password'}
          value={cpassword}
          setData={setCPassword}
          icon={icons.password}
          keyboard={true}
          secure={true}
          right={csecure ? icons.show : icons.hide}
          securePass={csecurePass}
          pass={!csecure}
        />

        <Button
          onPressFunction={changePassword}
          text={language ? `पुष्टि कीजिये` : `Confirm`}
        />

<TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className=" justify-center items-center py-4">
          <Text className="text-[#822BFF] font-[Poppins-Medium]  tracking-wider">
            {language ? `लॉगिन पर वापस जाएं` : `Back to login`}
          </Text>
        </TouchableOpacity>





      </View>

      {loading && <ActivityIndicatorComponent />}
    </View>
  );
};

export default ResetPassword;
