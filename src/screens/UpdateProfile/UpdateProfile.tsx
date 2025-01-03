import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputText from '../../components/Input/InputText';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {
  useCompleteProfileMutation,
  useUpdateProfileMutation,
} from '../../service/api/userApi';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../constants/icons';
import {useRoute} from '@react-navigation/native';
import navigationString from '../../constants/navigation';

import dayjs from 'dayjs';
import Calender from '../../components/Calender/Calender';
import CreateContractorModal from '../../components/contractor/ContractorModal';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import { ME } from '../../graphql/mutation/me';
import { useMutation } from '@apollo/client';
import { setUser } from '../../service/slice/userSlice';
import { bg_color, text_color } from '../../constants/color';
const UpdateProfile = ({navigation}: any) => {
  const {language, token, userData , dark} = useSelector((state: any) => state?.user);
  console.log(userData)
  const [me] = useMutation(ME);
  const route: any = useRoute();
  const [name, setName] = useState<string>(userData.fullname);
  const [nikname, setNikname] = useState<string>(userData.nikname);
  const [email, setEmail] = useState<string>(userData.email);
  const [address, setAddress] = useState<string>(userData.address);
  const [date, setDate] = useState(dayjs());
  const [phone, setPhone] = useState<string>(userData.phone);
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [calenderModal, setCalenderModal] = useState<boolean>(false);
  const [contractorModal, setCreateContractorMoadal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const dataFromScreenA = route.params?.data;


  // console.log(dataFromScreenA);

  const [updateProfile, {data, isError, isSuccess, error, isLoading}] =
    useUpdateProfileMutation();

  const handleImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo', // Limit selection to one image
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('user cancel the image pikker');
        return;
      } else if (response.errorCode) {
        console.log(response.errorMessage);
        return;
      }

      console.log('image ', response?.assets);

      if (response.assets) {
        const file = {
          uri: response.assets[0].uri,
          type: response.assets[0].type || 'image/jpeg', // Default to JPEG if type is not provided
          name: response.assets[0].fileName || 'image.jpg', // Default to 'image.jpg' if filename is not provided
        };
        setProfile(file);
      }
    });
  };

  const onChangeText = (text: string) => {
    setEmail(text.trim());
  };

  const onChangeState = (data: any, field: string) => {
    console.log(data);
    console.log(field);
  };

  const completeProfile = async () => {
    setLoading(true)
    try {
      const inputFormData = new FormData();
      profile &&
        inputFormData.append('file', {
          uri: profile.uri,
          name: 'image.png',
          fileName: 'image',
          // type: 'image/png',
          type: 'application/octet-stream',
        });
      name && inputFormData.append('fullname', name);
      userData?.id && inputFormData.append('userId',userData.id)
      // inputFormData.append('email', route.params?.data?.email);
      // inputFormData.append('password', route.params?.data?.password);
      nikname && inputFormData.append('nikname', nikname);
      phone && inputFormData.append('phone', phone);
      address && inputFormData.append('address', address);
      date && inputFormData.append('dob', date);
      console.log(inputFormData);

      const res = await updateProfile({
        body: inputFormData,
       token : userData.accessToken,
      });
      getUpdatedData()

      navigation.goBack()
    } catch (error) {
      console.log(error, 'catch');
    }
    // getUpdatedData()
    setLoading(false);
  };


  const getUpdatedData = async () =>{
    console.log("Inside get updated data")
    const headers = {
      authorization: `Bearer ${userData.accessToken}`,
    };
    try {
      const res = await me({ context: {headers},});
      console.log(res.data , ">>>>>>>>>>>>>>>>>")
  
      if (res.data?.me.user) {
        dispatch(setUser(res.data.me.user));
      }
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      navigation.navigate(navigationString.LOGIN);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);


  return (
    <ScrollView contentContainerStyle={{}}>
      <View className={`py-3 ${bg_color(dark)}`}>
        <View className="px-5 flex-row gap-5 my-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              className="w-8 h-8"
              resizeMode="contain"
              tintColor={dark ? "black" : "white"}
            />
          </TouchableOpacity>
          <Text className={`text-2xl font-semibold text-center  ${text_color(dark)}`}>
            {language ? `प्रोफ़ाइल पूर्ण क्र` : `Fill Your Profile`}
          </Text>
          <View />
        </View>

        <View className="relative w-36 h-36 mx-auto  justify-center items-center">
          <TouchableOpacity
            className="w-36 h-36 relative overflow-hidden  rounded-full  bg-gray-50 my-3  justify-center items-center"
            onPress={handleImage}>
            {profile?.uri ? (
              <Image
                source={profile ? {uri: `${profile.uri}`} : icons.avatar}
                className="w-full h-full"
                resizeMode="cover"
                tintColor={'#dbd7d2'}
              />
            ) : (
              <Image
                source={icons.avatar}
                className="w-full h-full"
                resizeMode="cover"
                tintColor={'#dbd7d2'}
              />
            )}

            {/* */}
          </TouchableOpacity>
          <View className="w-8 h-8 absolute bottom-1 right-1 bg-[#822BFF] rounded-xl justify-center items-center">
            <Image
              source={icons.edit}
              className="w-6 h-6 "
              tintColor={'#ffff'}
            />
          </View>
        </View>
        <View className=" bg-[#822BFF]/20"></View>

        <View className="px-4 ">
          <InputText
            label={language ? 'नाम' : 'Full Name'}
            value={name}
            keyboard={true}
            setData={setName}
            icon={icons.user}
            onChangeState={onChangeState}
          />
          <InputText
            label={language ? 'ईमेल' : 'Nikname'}
            value={nikname}
            keyboard={true}
            setData={setNikname}
            icon={icons.signature}
          />
          <InputText
            label={language ? 'ईमेल' : 'Email'}
            value={email}
            keyboard={true}
            setData={onChangeText}
            icon={icons.email}
          />
          <InputText
            label={language ? `पासवर्ड` : 'Date of Birth'}
            value={date.format('DD/MM/YYYY')}
            keyboard={true}
            secure={true}
            icon={icons.calendar}
            calendar={true}
            setCalenderModal={setCalenderModal}
          />

          <InputText
            label={language ? 'फ़ोन' : 'Phone'}
            value={phone}
            setData={setPhone}
            icon={icons.india}
            keyboard={true}
            flag={true}
          />

          <InputText
            label={language ? `पता` : 'Address'}
            value={address}
            setData={setAddress}
            icon={icons.location}
            keyboard={true}
            multiline={true}
          />

          <View className='flex-row gap-x-2 py-3 justify-between items-center'>
          <TouchableOpacity
              className="bg-[#822BFF]  py-3 rounded-full  flex-1"
              onPress={() => setCreateContractorMoadal(true)}>
              <Text className="text-white font-[Poppins-Regular] tracking-widest text-center text-lg ">
                {language ? `ठेकेदार` : ` contractor`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#822BFF]  py-3 rounded-full  flex-1 gap-x-2"
              onPress={completeProfile}>
              <Text className="text-white font-[Poppins-Regular] tracking-widest text-center text-lg ">
                {language ? `अद्यतन` : `Update`}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
        {
          (loading && <ActivityIndicatorComponent />)}
      </View>
      <Calender
        date={date}
        setDate={setDate}
        setCalenderModal={setCalenderModal}
        calenderModal={calenderModal}
      />
      {/* <CreateContractorModal
        navigation={navigation}
        create={create}
        setModal={setCreateContractorMoadal}
        contractorModal={contractorModal}
      /> */}
    </ScrollView>
  );
};

export default UpdateProfile;
