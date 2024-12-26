import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputText from '../../components/Input/InputText';
import {Icon, TextInput} from 'react-native-paper';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import images from '../../constants/images';
import {useCompleteProfileMutation} from '../../service/api/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import icons from '../../constants/icons';
import {setUser} from '../../service/slice/userSlice';
import Button from '../../components/common/Button';
import {useRoute} from '@react-navigation/native';
import navigationString from '../../constants/navigation';

import dayjs from 'dayjs';
import Calender from '../../components/Calender/Calender';
import {useMutation} from '@apollo/client';
import {REGISTER_USER} from '../../graphql/mutation/registerMeutation';
import env from '../../env';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
const CompleteProfileScreen = ({navigation}: any) => {
  const route: any = useRoute();
  const [name, setName] = useState<string>('');
  const [nikname, setNikname] = useState<string>('');
  const [email, setEmail] = useState<string>(
    route.params ? route.params.data.email : '',
  );
  const [address, setAddress] = useState<string>('');
  const [rnFile, setRnFile] = useState();
  const [date, setDate] = useState(dayjs());
  const [phone, setPhone] = useState<string>('');
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [calenderModal, setCalenderModal] = useState<boolean>(false);

  const {language, token} = useSelector((state: any) => state?.user);
  const [completeProfileApi, {data, isError, isSuccess, error, isLoading}] =
    useCompleteProfileMutation();

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
    setLoading(true);
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
      inputFormData.append('email', route.params?.data?.email);
      inputFormData.append('password', route.params?.data?.password);
      nikname && inputFormData.append('nikname', nikname);
      phone && inputFormData.append('phone', phone);
      address && inputFormData.append('address', address);
      date && inputFormData.append('dob', date);

      const res : any = await completeProfileApi({body: inputFormData});
      // navigation.navigate(navigationString.LOGIN)
      // showMessage({
      //   message : "User Created Successfully Please login.",
      //   type : "success"
      // })
      setLoading(false);

    } catch (error) {
      console.log(error, 'catch');
      setLoading(false);
    }
  };

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
      <View className="py-3 min-h-screen bg-white">
        <View className="px-5 flex-row gap-5 my-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center font-[Poppins-SemiBold]  text-black">
            {language ? `प्रोफ़ाइल पूर्ण क्र` : `Fill Your Profile`}
          </Text>
          <View />
        </View>

        <View className="relative w-36 h-36 mx-auto  justify-center items-center">
          <TouchableOpacity
            className="w-36 h-36 relative overflow-hidden  rounded-full  bg-gray-50 my-3  justify-center items-center"
            onPress={handleImage}>
            {profile ? (
              <Image
                source={{uri: `${profile.uri}`}}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={icons.avatar}
                className="w-full h-full"
                resizeMode="cover"
                tintColor={'#D3D3D3'}
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

          <TouchableOpacity
            onPress={() => setCalenderModal(true)}
            className="flex-row items-center bg-gray-100 mt-5 rounded-xl py-3 px-5 relative">
            <Text className="text-gray-300 absolute -top-2 left-4 text-xs ">
              {language ? `जन्म की तारीख`:`Date of Birth`}
            </Text>
            <Image
              source={icons.calendar}
              className="w-6 h-6"
              resizeMode="cover"
              tintColor={'#D3D3D3'}
            />
            <Text className="text-black ml-4 font-[Poppins-SemiBold]">
              {date.format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
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
          <Button
            onPressFunction={completeProfile}
            text={language ? `जरी राखे` : `Continue`}
          />
        </View>
      </View>
      <Calender
        date={date}
        setDate={setDate}
        setCalenderModal={setCalenderModal}
        calenderModal={calenderModal}
      />
      {loading && <ActivityIndicatorComponent />}
    </ScrollView>
  );
};

export default CompleteProfileScreen;
