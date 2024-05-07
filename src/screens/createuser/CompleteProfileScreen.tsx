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

import dayjs from 'dayjs';
import Calender from '../../components/Calender/Calender';
import {useMutation} from '@apollo/client';
import {REGISTER_USER} from '../../graphql/mutation/registerMeutation';
import env from '../../env';
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

  const dispatch = useDispatch();

  const dataFromScreenA = route.params?.data;
  // console.log(dataFromScreenA);

  // const [register, {data, error}] = useMutation(REGISTER_USER, {
  //   onError: err => {
  //     console.log(err);
  //   },
  // });

  const {language, token} = useSelector((state: any) => state?.user);
  // const [uploadProfile, {data, isError, isSuccess, error : any, isLoading}] =
  //   useUploadProfileMutation();
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
    try {
      const inputFormData = new FormData();
    //  profile && inputFormData.append('file', {
    //     uri: profile.uri,
    //     name: 'image.png',
    //     fileName: 'image',
    //     // type: 'image/png',
    // type: "application/octet-stream", 
    //   });
     name && inputFormData.append('fullname', name);
      inputFormData.append('email', route.params?.data?.email);
      inputFormData.append('password', route.params?.data?.password);
      nikname && inputFormData.append('nikname', nikname);
      phone && inputFormData.append('phone', phone);
      address && inputFormData.append('address', address);
      date && inputFormData.append('dob', date);
  //     fetch('http://192.168.251.213:3000/')
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // })
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(error => {
  //   console.error('Error fetching data:', error);
  // });
  //     fetch(`http://192.168.251.213:3000/user`, {
  //       method: 'POST',
  //       body: inputFormData,
  //       headers: {
  //           'Content-Type': 'multipart/form-data',
  //       },
  //   }).then(response => {
  //     if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  // })
  // .then(data => {
  //     console.log('Success:', data);
  // })
  // .catch(error => {
  //     console.error('Error:', error);
  // });

     const res = await  completeProfileApi({
        // body: inputFormData,
        body: {
          fullname : name , 
          password : route.params?.data?.password,
          email : route.params?.data?.email

        },
      });
      console.log(res , ">>>>>>>>>>")
    } catch (error) {
      console.log(error, 'catch');
    }

    setLoading(true);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  // useEffect(() => {
  //   if (isSuccess) {
  //   }
  //   if (userIsSuccess) {
  //     dispatch(setUser(userData));
  //     navigation.navigate('BottomTabs');
  //   }
  //   setLoading(false);
  // }, [isSuccess, userIsSuccess]);

  // useEffect(() => {
  //   if (isError) {
  //     console.log(error, 'eroor');
  //   }
  //   if (userIsError) {
  //     console.log(userError, 'userEroror');
  //   }
  //   setLoading(false);
  // }, [isError, userIsError]);

  return (
    <ScrollView contentContainerStyle={{}}>
      <View className="py-3 bg-white">
        <View className="px-5 flex-row gap-5 my-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center  text-black">
            {language ? `प्रोफ़ाइल पूर्ण क्र` : `Fill Your Profile`}
          </Text>
          <View />
        </View>

        <View className="relative w-36 h-36 mx-auto  justify-center items-center">
          <TouchableOpacity
            className="w-36 h-36 relative overflow-hidden  rounded-full  bg-gray-50 my-3  justify-center items-center"
            onPress={handleImage}>
            <Image
              source={profile ? {uri: `${profile.uri}`} : icons.avatar}
              className="w-full h-full"
              resizeMode="cover"
              // tintColor={!profile && '#D3D3D3'}
            />

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

          {/* <TextInput
            label={language ? `पता` : 'Address'}
            
            numberOfLines={3}
            className="mt-5 bg-gray-100 "
            mode="outlined"
            value={address}
            theme={{roundness: 10}}
            onChangeText={(text: string) => setAddress(text)}
            autoCapitalize="none"
            activeOutlineColor="#822BFF"
            outlineColor="transparent"
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon source={icons.location} size={22} color="#312651" />
                )}
              />
            }
          /> */}

          <Button
            onPressFunction={completeProfile}
            text={language ? `जरी राखे` : `Continue`}
          />
          {/* <TouchableOpacity className="bg-white border-[#312651] border-2 w-full py-3 rounded-lg mt-5">
            <Text className="text-[#312651] text-center text-lg font-medium">
              {language ? `लॉगिन पर वापस जाएं`:`Back To Login`}
            </Text>
          </TouchableOpacity> */}
        </View>
        {/* {userIsLoading ||
          isLoading ||
          (loading && <ActivityIndicatorComponent />)} */}
      </View>
      <Calender
        date={date}
        setDate={setDate}
        setCalenderModal={setCalenderModal}
        calenderModal={calenderModal}
      />
    </ScrollView>
  );
};

export default CompleteProfileScreen;
