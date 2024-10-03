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
import Button from '../../components/common/Button';
import icons from '../../constants/icons';


const ForgetPassword = ({navigation}: any) => {

  
  const {language} = useSelector((state: any) => state?.user);

  const [number, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();
  const [RegisterPhone, {data, isSuccess, isLoading, error, isError}] =
    useRegisterPhoneNumberMutation();


  const handleRegister = () => {
    // if (number) {
    //   if (number.includes('@gmail.com')) {
    //     RegisterPhone({phone : parseInt(number,10)})

    //   }else{
    //     console.log("phone number should be 10 digits")
    //     showMessage({
    //       message: "Phone",
    //       description: "Phone Number should be of 10 digits",
    //       type: "default",
    //       backgroundColor: "#DD3342", // background color
    //       color: "white", // text color
    //     });
    //   }
    // }else{
    //   console.log("phone number can not be empty")
    //   showMessage({
    //     message: "Phone",
    //     description: "phone number can not be empty",
    //     type: "default",
    //     backgroundColor: "#DD3342", // background color
    //     color: "white", // text color
    //   });
    // }
    if(email.includes('@gmail.com')){
      showMessage({
        message: "OTP",
        description: "We have sent otp on your gmail",
        type: "success",
        backgroundColor: "#DD3342", // background color
        color: "white", // text color
      });

      navigation.navigate("Otp")
    }else{
      showMessage({
        message: "Invalid",
        description: "You have entered inavlid email",
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
        <Text className="text-4xl font-semibold leading-relaxed text-[#822BFF]">
        {language ? `मज़दूर में आपका` :`Welcome to`}
        </Text>
        <Text className="text-4xl font-semibold leading-relaxed text-gray-900">
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
        {/* <InputText label={language ? `ईमेल`:"email"} value={number} setData={setPhoneNumber}  /> */}
        <InputText
          label={language ? 'ईमेल' : 'Email'}
          value={email}
          setData={setEmail}
          icon={icons.email}
          keyboard={true}
        />
        {/* <TouchableOpacity
          className=" justify-center items-center py-4"
          onPress={handleRegister}>
          <Text className="text-[#822BFF] font-[Poppins-Medium]  tracking-wider">
            {language ? `जारी रखना` : `Continue`}
          </Text>
        </TouchableOpacity> */}

        <Button
          onPressFunction={handleRegister}
          text={language ? `जारी रखना` : `Continue`}
        />

        <TouchableOpacity
          onPress={()=> navigation.navigate('Login') }
          className="border-[#822BFF] border-2 w-full py-3 rounded-full mt-5">
          <Text className="text-[#822BFF] text-center text-lg font-[Poppins-Medium] ">
            {language ? `लॉगिन पर वापस जाएं`:`Back To Login`}
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicatorComponent/>}
    </View>

  );
};

export default ForgetPassword;
