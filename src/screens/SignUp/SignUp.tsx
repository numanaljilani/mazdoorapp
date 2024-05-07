import {View, Text, useColorScheme, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import {loginMutation} from '../../graphql/auth';
import InputText from '../../components/Input/InputText';
import icons from '../../constants/icons';
import Button from '../../components/common/Button';
import SocialAuth from '../../components/SocialAuth/SocialAuth';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import navigationStrings from '../../constants/navigation';
import {showMessage} from 'react-native-flash-message';

const SignUp = ({navigation}: {navigation: any}) => {
  const colorScheme = useColorScheme();
  const {language} = useSelector((state: any) => state?.user);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(false);
  const dispatch = useDispatch();

  const securePass = async () => {
    setSecure(!secure);
  };

  const signup = async () => {
    if (!email) {
      showMessage({
        type: 'danger',
        message: 'Email is empty',
        description: 'Email is required',
      });
      return;
    }
    console.log(email?.endsWith('@gmail.com'));
    if (!email?.endsWith('@gmail.com')) {
      showMessage({
        type: 'danger',
        message: 'Invalid Email',
        description: `${email} is invalid email`,
      });
      return;
    }
    if (!password) {
      showMessage({
        type: 'danger',
        message: 'Password is empty',
        description: 'password is required',
      });
      return;
    }
    try {
      navigation.navigate(navigationStrings.COMPLETEPROFILESCREEN, {
        data: {email, password},
      });
    } catch (error: any) {
      console.log(error, 'Inside error handling');
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white  px-8 border-2">
      <Text className="text-4xl font-semibold text-gray-900 leading-relaxed font-[Poppins-Medium]">
        {language ? `अपने अकाउंट में लॉग इन करें` : `Create your Account`}
      </Text>
      <View className="w-full gap-y-4 mt-4">
        <InputText
          label={language ? 'ईमेल' : 'Email'}
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
          onPressFunction={signup}
          text={language ? `लॉग इन करें` : `Sign up`}
        />

        <View className="flex-row gap-x-2 justify-center items-center">
          <View className="border-t-2 border-gray-200 flex-1" />
          <Text className="text-gray-500  tracking-wide text-sm font-[Poppins-Medium]">
            {language ? `या जारी रखें` : `Or continue with`}
          </Text>
          <View className="border-t-2 border-gray-200  flex-1" />
        </View>

        <SocialAuth />
      </View>
      <View className="  mt-8">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-center text-gray-500 font-[Poppins-Medium]">
            {language
              ? ` पहले से एक खाता मौजूद है`
              : `Already have an account ?`}{' '}
            <Text className=" text-[#822BFF] tracking-wider font-[Poppins-Medium]">
              {language ? `साइन  करें` : `Sign in`}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
