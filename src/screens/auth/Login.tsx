import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import InputText from '../../components/Input/InputText';
import icons from '../../constants/icons';
import { useMutation} from '@apollo/client';

import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import {loginMutation} from '../../graphql/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken, setUser} from '../../service/slice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}: {navigation: any}) => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<any>();
  const dispatch = useDispatch();
  const {userData, token} = useSelector((state: any) => state?.user);
  const [login, {data, loading}] = useMutation(loginMutation);

  console.log(token , userData , ">>>>>>>>>")

  const handleLogin = async () => {
    if (phone.length < 10 || !password) {
      showMessage({
        type: 'danger',
        message: phone.length < 10 ? 'Phone Number' : 'Password is requred',
        description:
          phone.length < 10
            ? 'Phone number should be of 10 digits'
            : 'Password is requred',
      });
      return;
    }
    try {
      const res = await login({variables: {phone: parseInt(phone), password}});
      const {user, error} = res.data?.login;

      if (user) {
        console.log(user)

        dispatch(setUser(user))
        dispatch(setToken(user.access_token))
        const jsonValue = JSON.stringify(user.access_token);
        await AsyncStorage.setItem('token', jsonValue);
        navigation.replace("BottomTabs")
        showMessage({
          type : 'success',
          message :'Login successfull',
          description: 'Welcome to mazdoor',
        })
        return
      }
      if (error) {
        showMessage({
          type: 'danger',
          message: 'Invalid Password',
          description: error.message,
        });
        return;
      }
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
    <View className="flex-1 justify-center  px-8">
      <View>
        <Text className="text-4xl font-semibold leading-relaxed text-[#312651]">
          Welcome
        </Text>
        <Text className="text-4xl font-semibold leading-relaxed text-[#FF7754]">
          back !
        </Text>
      </View>
      <View className="py-3">
        <Text className=" text-sm leading-5">
          Connect with skilled workers easily. Find the right talent through our
          user-friendly login for labor seekers
        </Text>
      </View>
      <View className="w-full gap-y-4">
        <InputText
          label="Phone"
          value={phone}
          setData={setPhone}
          icon={icons.phone}
        />
        <InputText
          label="Password"
          value={password}
          setData={setPassword}
          icon={icons.password}
          keyboard={true}
        />

        <View className=" flex-row justify-between">
          <Text></Text>
          <Text className="text-blue-900">Forget password</Text>
        </View>

        <TouchableOpacity
          className="bg-[#312651] w-full py-3 rounded-xl"
          onPress={handleLogin}>
          <Text className="text-white text-center text-lg font-medium">
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex-row gap-x-2 justify-center items-center">
          <View className="border-t border-[#C1C0C8] flex-1" />
          <Text>Or</Text>
          <View className="border-t border-[#C1C0C8] flex-1" />
        </View>
        <View className=" w-full py-3 rounded-lg border-2 border-[#312651] ">
          {/* <TouchableOpacity className="text-[#83829A] text-center text-lg font-medium justify-center items-center flex-row gap-2">
            <Image  source={images.Google} className='w-8 h-8'/>
            <Text className="text-[#83829A] text-center text-lg font-medium ">
              Continue with google
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            className="text-center text-lg font-medium justify-center items-center flex-row gap-2"
            onPress={() => navigation.navigate('RegisterPhone')}>
            {/* <Image  source={images.Google} className='w-8 h-8'/> */}
            <Text className="text-[#312651] text-center text-lg font-medium ">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
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
