import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';

import images from '../../constants/images';
import { TextInput } from 'react-native-paper';
import InputText from '../../components/Input/InputText';

const Login = ({ navigation } : {navigation : any}) => {
  const [email , setEmail] = useState<string>('');
  const [password , setPassword ] = useState<string>('')
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
   
        <InputText label ='Email' value ={email}/>
        <InputText label = 'Password' value = {password}/>

        <View className=" flex-row justify-between">
          <Text></Text>
          <Text className="text-blue-900">Forget password</Text>
        </View>

        <TouchableOpacity className="bg-[#312651] w-full py-3 rounded-full" onPress={()=> navigation.replace("BottomTabs") }>
          <Text className="text-white text-center text-lg font-medium">
            Sign in
          </Text>
        </TouchableOpacity>
        <View className="flex-row gap-x-2 justify-center items-center">
          <View className="border-t border-[#C1C0C8] flex-1" />
          <Text>Or</Text>
          <View className="border-t border-[#C1C0C8] flex-1" />
        </View>
        <View className=" w-full py-3 rounded-full bg-[#C1C0C8]">
          <TouchableOpacity className="text-[#83829A] text-center text-lg font-medium justify-center items-center flex-row gap-2">
            <Image  source={images.Google} className='w-8 h-8'/>
            <Text className="text-[#83829A] text-center text-lg font-medium ">
              Continue with google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
