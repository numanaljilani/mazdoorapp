import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputText from '../../components/Input/InputText';
import images from '../../constants/images';
import {useRegisterPhoneNumberMutation} from '../../service/api/userApi';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../../service/slice/userSlice';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';


const RegisterPhoneNumberScreen = ({navigation}: any) => {

  
  const {language} = useSelector((state: any) => state?.user);

  const [number, setPhoneNumber] = useState<string>('');
  const dispatch = useDispatch();
  const [RegisterPhone, {data, isSuccess, isLoading, error, isError}] =
    useRegisterPhoneNumberMutation();


  const handleRegister = () => {
    if (number) {
      if (number.length == 10) {
        RegisterPhone({phone : parseInt(number,10)})

      }else{
        console.log("phone number should be 10 digits")
        showMessage({
          message: "Phone",
          description: "Phone Number should be of 10 digits",
          type: "default",
          backgroundColor: "#DD3342", // background color
          color: "white", // text color
        });
      }
    }else{
      console.log("phone number can not be empty")
      showMessage({
        message: "Phone",
        description: "phone number can not be empty",
        type: "default",
        backgroundColor: "#DD3342", // background color
        color: "white", // text color
      });
    }
  };

  const storeAsyncData = async  (value : any) =>{
    const jsonValue = JSON.stringify(value.acess_token);
    await AsyncStorage.setItem('token', jsonValue);
    dispatch(setToken(value.acess_token));
    navigation.navigate('Otp')

    showMessage({
      message: "OTP",
      description: "OTP has sent sucessfully" ,
      type: "success",
      backgroundColor: "green", // background color
      color: "white", // text color
    });
  }

  useEffect(()=>{
    if(isSuccess){
      storeAsyncData(data)


    }
  
  },[isSuccess])
  useEffect(()=>{
    if(!isError) return
    if(error?.data){
      showMessage({
        message: "Phone",
        description: error?.data?.message ,
        type: "default",
        backgroundColor: "#DD3342", // background color
        color: "white", // text color
      });
    }else{
      showMessage({
        message: "Phone",
        description: "phone number can not be empty",
        type: "default",
        backgroundColor: "#DD3342", // background color
        color: "white", // text color
      });
    }
  },[isError])

  return (

    <View className=" py-11 flex-1 bg-white px-6">
      <View className="mt-10 -mb-6 z-10">
        <Text className="text-4xl font-semibold leading-relaxed text-[#312651]">
        {language ? `मज़दूर में आपका` :`Welcome to`}
        </Text>
        <Text className="text-4xl font-semibold leading-relaxed text-[#FF7754]">
        {language ? `स्वागत है`:`Mazdur`}
        </Text>
      </View>
      {/* <View className="h-1/3  ">
        <Image
          source={images.Register}
          className="w-full h-52"
          resizeMode="contain"
        />
      </View> */}
      <View className="mt-11">
        <Text className=" text-sm leading-5">
        {language
            ? 'दक्ष कामगारों से आसानी से जुड़ें और हमारे यूजर-फ्रेंडली लॉगिन के माध्यम से उन्हें खोजें।'
            : `Connect with skilled workers easily. Find the right talent through our
          user-friendly login for labor seekers`}
        </Text>
      </View>
      <View className="">
        <InputText label={language ? `फ़ोन`:"Phone"} value={number} setData={setPhoneNumber} keyboard={false} />
        <TouchableOpacity
          className="bg-[#312651] w-full py-3 rounded-xl mt-5"
          onPress={handleRegister}>
          <Text className="text-white text-center text-lg font-medium">
            {language ? `जारी रखना` : `Continue`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=> navigation.navigate('Login') }
          className="border-[#312651] border-2 w-full py-3 rounded-xl mt-5">
          <Text className="text-[#312651] text-center text-lg font-medium">
            {language ? `लॉगिन पर वापस जाएं`:`Back To Login`}
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicatorComponent/>}
    </View>

  );
};

export default RegisterPhoneNumberScreen;
